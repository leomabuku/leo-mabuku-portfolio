export const examples = [
  {
    name: "Hello, TongaLang",
    source: 'mulimo matalikilo() {\n    amba("Hello, TongaLang!")\n}',
    input: "",
  },
  {
    name: "Variables & arithmetic",
    source:
      "mulimo matalikilo() {\n    zina a = 12\n    zina b = 8\n    amba(a + b)\n    amba(a * b)\n}",
    input: "",
  },
  {
    name: "Functions & conditions",
    source:
      'mulimo yungizya(a, b) {\n    pilula a + b\n}\n\nmulimo matalikilo() {\n    zina total = yungizya(10, 20)\n    kuti (total inda 25) {\n        amba("Greater than 25")\n    } nakunyina {\n        amba("25 or less")\n    }\n    amba(total)\n}',
    input: "",
  },
  {
    name: "A counting loop",
    source:
      "mulimo matalikilo() {\n    induluka i kuzwa 1 kusika 5 {\n        amba(i)\n    }\n}",
    input: "",
  },
  {
    name: "Read input with bala()",
    source:
      'mulimo matalikilo() {\n    zina zyina = bala("Your name: ")\n    amba("Hello, " + zyina)\n    zina namba = bala("A number: ")\n    amba(namba + 8)\n}',
    input: "Leo\n42",
  },
  {
    name: "Explore an error",
    source: "mulimo matalikilo() {\n    amba(10 / 0)\n}",
    input: "",
  },
];
