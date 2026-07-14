import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chooseFeatured, contentHash, safeSummary, validateProfile } from './content-utils.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectsPath = path.join(root, 'src/data/projects.json');
const cachePath = path.join(root, 'src/data/summary-cache.json');
const profilePath = path.join(root, 'src/data/profile.json');
const headers = {'Accept':'application/vnd.github+json','User-Agent':'leo-mabuku-portfolio','X-GitHub-Api-Version':'2022-11-28'};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function json(url, options={}) { const res = await fetch(url,{...options,headers:{...headers,...options.headers}}); if(!res.ok) throw new Error(`${url}: ${res.status}`); return res.json(); }
async function readJson(file, fallback) { try{return JSON.parse(await fs.readFile(file,'utf8'))}catch{return fallback} }
async function readme(repo) { try { const data=await json(`https://api.github.com/repos/leomabuku/${repo}/readme`); return Buffer.from(data.content,'base64').toString('utf8').slice(0,12000); } catch { return ''; } }
async function generate(repo, text) {
  if (!process.env.MODELS_TOKEN || !text) return '';
  const res=await fetch('https://models.github.ai/inference/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.MODELS_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({model:'openai/gpt-4.1-mini',temperature:.2,max_tokens:90,messages:[{role:'system',content:'Write one factual 25-40 word portfolio summary. Use only supplied evidence. Never invent metrics, employers, users, or outcomes.'},{role:'user',content:`Repository: ${repo.name}\nDescription: ${repo.description||''}\nREADME:\n${text}`}]})});
  if(!res.ok) return ''; const body=await res.json(); return body.choices?.[0]?.message?.content||'';
}
async function importDriveProfile() {
  const id=process.env.GOOGLE_PROFILE_FILE_ID, credentials=process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if(!id||!credentials) return null;
  console.warn('Drive import is reserved until the approved structured document and service account are supplied. Existing validated profile retained.');
  return null;
}

const oldProjects=await readJson(projectsPath,[]), cache=await readJson(cachePath,{});
try {
  const repos=chooseFeatured(await json('https://api.github.com/users/leomabuku/repos?per_page=100&type=owner'));
  const refreshed=[];
  for (const repo of repos) {
    const previous=oldProjects.find(p=>p.repo===repo.name)||{}; const text=await readme(repo.name); const hash=contentHash({description:repo.description,text});
    let generated=''; if(cache[repo.name]?.hash!==hash) generated=await generate(repo,text);
    const summary=safeSummary({generated,cached:cache[repo.name]?.summary||previous.summary,description:repo.description});
    cache[repo.name]={hash,summary};
    refreshed.push({...previous,slug:previous.slug||repo.name.toLowerCase(),name:previous.name||repo.name,repo:repo.name,type:previous.type||repo.language||'Software project',language:repo.language,summary,problem:previous.problem||'A practical problem explored through software.',contribution:previous.contribution||'Designed and developed the public project.',stack:previous.stack?.length?previous.stack:[repo.language].filter(Boolean),featured:true,updatedAt:repo.pushed_at,stars:repo.stargazers_count});
  }
  if(refreshed.length) await fs.writeFile(projectsPath,JSON.stringify(refreshed,null,2)+'\n');
  await fs.writeFile(cachePath,JSON.stringify(cache,null,2)+'\n');
} catch(error) { console.warn(`GitHub refresh skipped; retaining last valid content. ${error.message}`); }
try { const drive=await importDriveProfile(); if(drive) await fs.writeFile(profilePath,JSON.stringify(validateProfile(drive),null,2)+'\n'); } catch(error) { console.warn(`Drive refresh skipped; retaining last valid content. ${error.message}`); }
