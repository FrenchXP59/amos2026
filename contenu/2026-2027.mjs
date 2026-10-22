/* =========================================================================
   CONTENU DE L'ANNÉE 2026-2027 — c'est le seul fichier à modifier au quotidien.
   - cours   : contenu partagé entre les classes (repris des syllabus AMOS)
   - outils  : catalogue des applis, rattachées aux cours par leur identifiant
   - classes : séances datées (générées depuis le planning). Pour chaque séance :
       video      : URL YouTube, Drive ou .mp4
       apps       : [{ label, url }]
       ressources : [{ titre, type, url }]  (fichiers dans apps/ ou ressources/)
   Les codes d'accès ne sont PAS ici : voir README (variable BOX_CODES).
   ========================================================================= */
export default {
  "annee": "2026-2027",
  "archive": {
    "label": "2025-2026",
    "url": ""
  },
  "intervenant": "Frédéric Legrand",
  "cours": {
    "ia-com": {
      "titre": "IA appliquée à la communication",
      "ue": "Marketing – Communication",
      "semestre": 1,
      "volume": "7 h en présentiel",
      "evaluation": "Contrôle continu",
      "descriptif": "Un atelier pratique pour intégrer les outils d'IA générative à la communication événementielle : prompt engineering, cohérence graphique et rédactionnelle, regard critique sur les contenus produits. Fil rouge : le CITANUIT Trail Lille, un événement fictif.",
      "objectifs": [
        "Identifier les principaux outils d'IA générative utiles en communication et évaluer leur pertinence",
        "Produire des contenus textuels et visuels adaptés à une cible, un support et un objectif",
        "Formuler des prompts efficaces pour répondre à la demande d'un commanditaire",
        "Évaluer de manière critique les contenus générés : pertinence, cohérence graphique, registre, conformité au brief",
        "Intégrer les outils d'IA dans un flux de création de supports événementiels"
      ],
      "outils": []
    },
    "concours-vente": {
      "titre": "Projet : concours de vente",
      "ue": "Marketing – Vente",
      "semestre": 1,
      "volume": "21 h en présentiel et 21 h en projet autonome",
      "evaluation": "Oral collectif de mise en situation devant un jury professionnel",
      "descriptif": "Se préparer au métier de la vente et au premier stage : observation de points de vente et visites en client mystère, compte-rendu d'analyse terrain, puis construction d'un argumentaire et d'un pitch commercial sur un produit ou service du sport, défendu devant un jury de professionnels.",
      "objectifs": [
        "Identifier les besoins client à partir d'un contexte donné",
        "Construire un argumentaire structuré avec les méthodes AIDA, SONCAS ou CAB",
        "Présenter et défendre un pitch commercial devant un jury",
        "Répondre aux objections en situation simulée",
        "Appliquer la méthode du client mystère selon une grille définie",
        "Rédiger un compte-rendu d'analyse terrain"
      ],
      "outils": [
        "pitchcoach"
      ]
    },
    "fondamentaux-ia": {
      "titre": "Fondamentaux de l'IA",
      "ue": "Sport et société",
      "semestre": 2,
      "volume": "7 h en présentiel",
      "evaluation": "Contrôle continu",
      "descriptif": "Les bases de l'IA et de la productivité : comprendre les concepts clés, repérer les tâches où l'IA fait vraiment gagner du temps, apprendre à prompter, expérimenter des assistants, en gardant en tête les limites et les biais des IA génératives.",
      "objectifs": [
        "Comprendre les principes fondamentaux de l'IA",
        "Exploiter l'IA pour collecter, synthétiser et analyser rapidement des informations",
        "Prompter pour obtenir des réponses pertinentes",
        "Comprendre et configurer des assistants IA pour des tâches courantes",
        "Utiliser l'IA pour gagner en qualité et en rapidité"
      ],
      "outils": [
        "ialudique",
        "amosethique"
      ]
    },
    "ia-marketing": {
      "titre": "IA et marketing",
      "ue": "Marketing – Commercial",
      "semestre": 2,
      "volume": "7 h en présentiel et 3 h 45 de FOAD",
      "evaluation": "Contrôle continu",
      "descriptif": "Les usages de l'IA dans les métiers du marketing : analyse de données, connaissance client, création de contenus, optimisation des actions, avec des études de cas, des ateliers pratiques et un regard critique sur l'éthique et le RGPD.",
      "objectifs": [
        "Concevoir des prompts avancés pour produire textes marketing, rapports et synthèses",
        "Identifier les principaux cas d'usage de l'IA en marketing",
        "Produire et améliorer des contenus marketing avec l'IA générative",
        "Interpréter des données et des recommandations produites par l'IA",
        "Adopter un usage responsable et éthique de l'IA"
      ],
      "outils": [
        "amos-lab"
      ]
    },
    "ia-automatisation": {
      "titre": "IA et automatisation",
      "ue": "Diagnostics stratégiques du sport business",
      "semestre": 1,
      "volume": "7 h en présentiel",
      "evaluation": "Participation",
      "descriptif": "Passer de l'usage intuitif à l'usage professionnel des LLM : savoir ce qu'on délègue à la machine, comment le formuler et comment en évaluer la fiabilité. Cas d'usage marketing et com, veille assistée, puis introduction à l'automatisation no-code (Make, Zapier).",
      "objectifs": [
        "Distinguer un usage amateur d'un usage professionnel des LLM",
        "Construire des prompts efficaces pour la rédaction, la synthèse et la reformulation",
        "Accélérer des livrables courants : brief, plan éditorial, note de synthèse",
        "Adopter une posture critique face aux productions générées",
        "Identifier les tâches automatisables et comprendre la logique des flux no-code"
      ],
      "outils": [
        "amosethique"
      ]
    },
    "ia-productivite": {
      "titre": "IA et productivité",
      "ue": "Diagnostics stratégiques du sport business",
      "semestre": 1,
      "volume": "7 h en présentiel",
      "evaluation": "Contrôle continu",
      "descriptif": "De l'utilisateur au manager qui intègre l'IA dans la décision stratégique : frontière irrégulière de l'IA, chaînes de prompts, audit des sorties, scénarios et cadrage des usages de l'IA dans une équipe. Fil rouge : l'Olympique Nordval, un club de Ligue 2 fictif.",
      "objectifs": [
        "Conduire une analyse stratégique fiable avec l'IA",
        "Concevoir des chaînes de prompts pour des problématiques marketing et com",
        "Évaluer la fiabilité et la pertinence des sorties de l'IA",
        "Utiliser l'IA pour la synthèse et la modélisation de scénarios",
        "Cadrer et superviser les usages de l'IA d'une équipe"
      ],
      "outils": [
        "amosethique"
      ]
    }
  },
  "outils": {
    "pitchcoach": {
      "nom": "PitchCoach AMOS",
      "desc": "Préparer son pitch de vente : rôles, argumentaire, objections, simulation chronométrée.",
      "url": "https://pitchcoach.horizonduo.net"
    },
    "ialudique": {
      "nom": "Découvre l'IA",
      "desc": "Exploration ludique des concepts fondamentaux de l'IA.",
      "url": "https://ialudique.horizonduo.net"
    },
    "amosethique": {
      "nom": "Analyse critique d'un recrutement",
      "desc": "Cas sport business : un prompt flou, une réponse convaincante mais fragile.",
      "url": "https://amosethique.horizonduo.net"
    },
    "amos-lab": {
      "nom": "Lab AMOS",
      "desc": "Cas pratique en groupe : concevoir une landing page avec l'IA et documenter ses prompts.",
      "url": "https://amos-lab.horizonduo.net"
    }
  },
  "classes": {
    "b1a": {
      "label": "B1A",
      "niveau": "Bachelor 1re année",
      "programme": "Bachelor marketing, commercial & événementiel sport",
      "seances": [
        {
          "cours": "concours-vente",
          "n": 1,
          "date": "2026-11-04",
          "heure": "09:00–12:30",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        },
        {
          "cours": "concours-vente",
          "n": 2,
          "date": "2026-11-23",
          "heure": "13:30–17:00",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        },
        {
          "cours": "concours-vente",
          "n": 3,
          "date": "2026-11-24",
          "heure": "13:30–17:00",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        },
        {
          "cours": "concours-vente",
          "n": 4,
          "date": "2026-11-25",
          "heure": "09:00–12:30",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        },
        {
          "cours": "concours-vente",
          "n": 5,
          "date": "2026-11-27",
          "heure": "09:00–12:30",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        },
        {
          "cours": "concours-vente",
          "n": 6,
          "date": "2026-11-27",
          "heure": "13:30–17:00",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        },
        {
          "cours": "fondamentaux-ia",
          "n": 1,
          "date": "2027-04-06",
          "heure": "09:00–12:30",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        },
        {
          "cours": "fondamentaux-ia",
          "n": 2,
          "date": "2027-04-06",
          "heure": "13:30–17:00",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        }
      ]
    },
    "b2a": {
      "label": "B2A",
      "niveau": "Bachelor 2e année",
      "programme": "Bachelor marketing, commercial & événementiel sport",
      "seances": [
        {
          "cours": "ia-marketing",
          "n": 1,
          "date": "2027-04-07",
          "heure": "09:00–12:30",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        },
        {
          "cours": "ia-marketing",
          "n": 2,
          "date": "2027-04-07",
          "heure": "13:30–17:00",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        }
      ]
    },
    "b3a": {
      "label": "B3A",
      "niveau": "Bachelor 3e année",
      "programme": "Bachelor marketing, commercial & événementiel sport",
      "seances": [
        {
          "cours": "ia-com",
          "n": 1,
          "date": "2026-11-03",
          "heure": "13:30–17:00",
          "titre": "Panorama, agents et prompt engineering",
          "video": "",
          "apps": [
            {
              "outil": "appli-ia-com",
              "url": "apps/ia-communication/index.html?classe=b3a",
              "label": "Appli de la séance"
            }
          ],
          "ressources": []
        },
        {
          "cours": "ia-com",
          "n": 2,
          "date": "2026-11-23",
          "heure": "09:00–12:30",
          "titre": "Visuels, mini-kit et pitch devant le client",
          "video": "",
          "apps": [
            {
              "outil": "appli-ia-com",
              "url": "apps/ia-communication/index.html?classe=b3a#pitch",
              "label": "Simulateur de pitch"
            }
          ],
          "ressources": []
        }
      ]
    },
    "b3b": {
      "label": "B3B",
      "niveau": "Bachelor 3e année",
      "programme": "Bachelor marketing, commercial & événementiel sport",
      "seances": [
        {
          "cours": "ia-com",
          "n": 1,
          "date": "2026-11-02",
          "heure": "09:00–12:30",
          "titre": "Panorama, agents et prompt engineering",
          "video": "",
          "apps": [
            {
              "outil": "appli-ia-com",
              "url": "apps/ia-communication/index.html?classe=b3b",
              "label": "Appli de la séance"
            }
          ],
          "ressources": []
        },
        {
          "cours": "ia-com",
          "n": 2,
          "date": "2026-11-05",
          "heure": "13:30–17:00",
          "titre": "Visuels, mini-kit et pitch devant le client",
          "video": "",
          "apps": [
            {
              "outil": "appli-ia-com",
              "url": "apps/ia-communication/index.html?classe=b3b#pitch",
              "label": "Simulateur de pitch"
            }
          ],
          "ressources": []
        }
      ]
    },
    "m1a": {
      "label": "M1A",
      "niveau": "Mastère 1re année",
      "programme": "Mastère Management du Sport, Marketing & Communication",
      "seances": [
        {
          "cours": "ia-automatisation",
          "n": 1,
          "date": "2026-11-03",
          "heure": "09:00–12:30",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        },
        {
          "cours": "ia-automatisation",
          "n": 2,
          "date": "2026-11-06",
          "heure": "09:00–12:30",
          "titre": "",
          "video": "",
          "apps": [],
          "ressources": []
        }
      ]
    },
    "m2a": {
      "label": "M2A",
      "niveau": "Mastère 2e année",
      "programme": "Mastère Management du Sport, Marketing & Communication",
      "seances": [
        {
          "cours": "ia-productivite",
          "n": 1,
          "date": "2026-11-02",
          "heure": "13:30–17:00",
          "titre": "Frontière irrégulière, chaînes de prompts, diagnostic et scénarios",
          "video": "",
          "apps": [
            {
              "outil": "appli-ia-productivite",
              "url": "apps/ia-productivite/index.html?classe=m2a",
              "label": "Appli de la séance"
            }
          ],
          "ressources": []
        },
        {
          "cours": "ia-productivite",
          "n": 2,
          "date": "2026-11-25",
          "heure": "13:30–17:00",
          "titre": "Recommandation, charte IA d'équipe et comité de direction",
          "video": "",
          "apps": [
            {
              "outil": "appli-ia-productivite",
              "url": "apps/ia-productivite/index.html?classe=m2a#pitch",
              "label": "Simulateur de comité de direction"
            }
          ],
          "ressources": []
        }
      ]
    },
    "m2b": {
      "label": "M2B",
      "niveau": "Mastère 2e année",
      "programme": "Mastère Management du Sport, Marketing & Communication",
      "seances": [
        {
          "cours": "ia-productivite",
          "n": 1,
          "date": "2026-11-04",
          "heure": "13:30–17:00",
          "titre": "Frontière irrégulière, chaînes de prompts, diagnostic et scénarios",
          "video": "",
          "apps": [
            {
              "outil": "appli-ia-productivite",
              "url": "apps/ia-productivite/index.html?classe=m2b",
              "label": "Appli de la séance"
            }
          ],
          "ressources": []
        },
        {
          "cours": "ia-productivite",
          "n": 2,
          "date": "2026-11-26",
          "heure": "13:30–17:00",
          "titre": "Recommandation, charte IA d'équipe et comité de direction",
          "video": "",
          "apps": [
            {
              "outil": "appli-ia-productivite",
              "url": "apps/ia-productivite/index.html?classe=m2b#pitch",
              "label": "Simulateur de comité de direction"
            }
          ],
          "ressources": []
        }
      ]
    }
  }
};
