import { describe,it,expect } from 'vitest'; import { chooseFeatured,safeSummary,validateProfile } from './content-utils.mjs';
describe('content refresh safeguards',()=>{
  it('uses portfolio topics and excludes forks',()=>{const repos=[{name:'A',topics:['portfolio'],fork:false,archived:false},{name:'B',topics:['portfolio'],fork:true,archived:false}];expect(chooseFeatured(repos).map(r=>r.name)).toEqual(['A'])});
  it('uses the approved fallback set when no topics exist',()=>{const repos=[{name:'LifeHarmonyTracker',topics:[],fork:false,archived:false},{name:'other',topics:[],fork:false,archived:false}];expect(chooseFeatured(repos).map(r=>r.name)).toEqual(['LifeHarmonyTracker'])});
  it('keeps cached summary on AI failure',()=>expect(safeSummary({generated:'',cached:'Last good',description:'Repo'})).toBe('Last good'));
  it('rejects malformed Drive profile data',()=>expect(()=>validateProfile({name:'Leo'})).toThrow('Missing profile field'));
});
