import useLocalStorage, { writeStorage } from '@rehooks/local-storage';
import Axios, { AxiosError } from 'axios';
import CheckboxToggle from 'components/CheckboxToggle';
import HeroCard from 'components/HeroCard';
import SearchInput from 'components/InputSearch';
import SectionHeader from 'components/SectionHeader';
import useDebounce from 'core/utils/hooks/useDebounce';
import React, { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import styled from 'styled-components';
import { useSWRInfinite } from 'swr';
import { ReactComponent as HeroLogo } from 'assets/icones/heroi/noun_Superhero_2227044@1,5x.svg';
import { ReactComponent as MarvelHeaderLogo } from 'assets/logo/Group@1,5x.svg';

import ButtonHeart from 'components/ButtonHeart';

export const allHeroesIn05Nov2020 = [
  'Hulk',
  'Doctor Strange',
  'Captain Marvel (Carol Danvers)',
  'Guardians of the Galaxy',
  'Spider-Man',
  'Avengers',
  'Deadpool',
  'Captain America',
  'Thor',
  'Daredevil',
  'Moon Girl (Lunella Layfayette)',
  'Spider-Gwen (Spider-Gwen)',
  'Black Panther',
  'Mr. Negative',
  'New Mutants',
  'Speedball (Robert Baldwin)',
  'Night Thrasher (Dwayne Taylor)',
  'Night Thrasher',
  'Tippy Toe',
  'Quake (Daisy Johnson)',
  'Okoye',
  'Nakia (Nakia)',
  'Phil Coulson (Phil Coulson)',
  'Baron Zemo (Heinrich Zemo)',
  'Legion',
  'Punisher',
  'Thunderbird (John Proudstar)',
  'Karnak',
  'Gorgon',
  'Karen Page',
  'Elektra',
  'Iron Fist (Danny Rand)',
  'Loki',
  'Jessica Jones',
  'Killmonger',
  'Grandmaster',
  'Luke Cage',
  'Ant-Man (Scott Lang)',
  'X-Men',
  'Iron Man',
  'Misty Knight',
  'Nova',
  'Gwen Stacy',
  'J. Jonah Jameson',
  'Runaways',
  'Squirrel Girl',
  'Mary Jane Watson',
  'Inhumans',
  'Gladiator (Kallark)',
  'Imperial Guard',
  'Cyclops',
  'Emma Frost',
  'Hawkeye',
  'Doctor Doom',
  'Nightmare',
  'Scarlet Witch',
  'Gamora',
  'Falcon',
  'Red Skull',
  'Storm',
  'Skrulls',
  'Thing',
  'Namor',
  'Venom (Flash Thompson)',
  'The Hood',
  'Thanos',
  'Fantastic Four',
  'Mephisto',
  'Vision',
  'Winter Soldier',
  'Wolverine',
  'Ms. Marvel (Kamala Khan)',
  'Spider-Woman (Jessica Drew)',
  'Sharon Carter',
  'S.H.I.E.L.D.',
  'Cable',
  'Moon Knight',
  'Gambit',
  'Black Cat',
  'Wasp',
  'Carnage',
  'X-Factor',
  'X-23',
  'Colossus',
  'Spider-Man (Miles Morales)',
  'X-Force',
  'Magneto',
  'Morbius',
  'Defenders',
  'Ghost Rider (Daniel Ketch)',
  'Ghost Rider (Johnny Blaze)',
  'Nick Fury',
  'Jubilee',
  'Ka-Zar',
  'Bullseye',
  'Rictor',
  'Iceman',
  'Agents of Atlas',
  'Mister Sinister',
  'Rogue',
  'Enchantress (Sylvie Lushton)',
  'Black Widow',
  'Pepper Potts',
  'Mockingbird',
  'The Howling Commandos',
  'Psylocke',
  'Electro',
  'Hank Pym',
  'Spider-Man (Noir)',
  'Spider-Ham (Larval Earth)',
  'Sif',
  'Squadron Sinister',
  'Devil Dinosaur (Devil Dinosaur)',
  'Nova (Sam Alexander)',
  'Hawkeye (Kate Bishop)',
  'Thor (Goddess of Thunder)',
  'Captain America (Sam Wilson)',
  'Angela (Aldrif Odinsdottir)',
  'Miracleman',
  'Eddie Brock',
  'Domino',
  'Galactus',
  'Cosmo (dog)',
  'Rocket Raccoon',
  'Ronan',
  'Nebula',
  'Star-Lord (Peter Quill)',
  'Toad',
  'Deathlok',
  'Medusa',
  "Shi'Ar",
  'Kree',
  'Eternals',
  'Brotherhood of Evil Mutants',
  'Invaders',
  'Odin',
  'Yellowjacket (Rita DeMara)',
  'Mystique',
  'Maria Hill',
  'Apocalypse',
  'Starjammers',
  'Morlocks',
  'Human Torch (Jim Hammond)',
  'Scarlet Witch (Age of Apocalypse)',
  'Sunfire (Age of Apocalypse)',
  'Sunfire',
  'Warbound',
  'Unus (Age of Apocalypse)',
  'Jubilee (Age of Apocalypse)',
  'Silver Samurai (Age of Apocalypse)',
  'Komodo (Melati Kusuma)',
  'Lady Deathstrike',
  'Fantomex',
  'Venus (Siren)',
  'Swordsman',
  'Silver Sable',
  'Shang-Chi',
  'Paladin',
  'Red Ghost',
  'Ares',
  'Moonstone',
  'New X-Men',
  'Deathcry',
  'Hardball',
  'Gauntlet (Joseph Green)',
  'Demogoblin',
  'Proteus',
  'Franklin Richards',
  'Mandarin',
  'Valkyrie (Samantha Parrington)',
  'Henry Peter Gyrich',
  'Ego',
  'May Parker',
  'Prodigy',
  '3-D Man',
  'Callisto (Age of Apocalypse)',
  'War Machine (Parnell Jacobs)',
  'Onslaught',
  'U.S. Agent',
  'X-Man',
  'Shadowcat (Age of Apocalypse)',
  'Shadow King (Age of Apocalypse)',
  'Abyss',
  'Vengeance (Michael Badilino)',
  'Red She-Hulk',
  'Spider-Girl (May Parker)',
  'Blue Marvel',
  'Mojo',
  'Wolverine (Ultimate)',
  'Venom (Ultimate)',
  'Venom (Mac Gargan)',
  'Valkyrie (Ultimate)',
  'Thor (Ultimate)',
  'Storm (Ultimate)',
  'Storm (Age of Apocalypse)',
  'Thanos (Ultimate)',
  'Spider-Man (Marvel Zombies)',
  'Scarlet Witch (Ultimate)',
  'Spider-Man (Ultimate)',
  'Spider-Woman (Mattie Franklin)',
  'Rogue (Ultimate)',
  'Spider-Woman (Charlotte Witter)',
  'Spider-Man (House of M)',
  'Spider-Man (Ben Reilly)',
  'She-Hulk (Ultimate)',
  'Spider-Man (1602)',
  'Quicksilver (Ultimate)',
  'Quicksilver',
  'Punisher (2099)',
  'Nova (Frankie Raye)',
  'Mr. Fantastic (Ultimate)',
  'Magneto (Ultimate)',
  'Magneto (Age of Apocalypse)',
  'Magneto (House of M)',
  'Jean Grey (Ultimate)',
  'Iron Fist (Wu Ao-Shi)',
  'Iron Fist (Orson Randall)',
  'Iron Man (Ultimate)',
  'Iceman (Ultimate)',
  'Iron Fist (Quan Yaozu)',
  'Cyclops (Ultimate)',
  'Daredevil (Ultimate)',
  'Doctor Doom (Ultimate)',
  'Elektra (Ultimate)',
  'Hawkeye (Ultimate)',
  'Human Torch (Ultimate)',
  'Hulk (Ultimate)',
  'Hulk (Marvel Zombies)',
  'Doctor Strange (Ultimate)',
  "Ant-Man (Eric O'Grady)",
  'Beast (Ultimate)',
  'Black Panther (Ultimate)',
  'Black Widow (Ultimate)',
  'Captain America (Ultimate)',
  'Captain America (House of M)',
  'Cable (Ultimate)',
  'Angel (Ultimate)',
  'Angel (Thomas Halloway)',
  'Dracula',
  'Quentin Quire',
  'Titania',
  'Boomerang',
  'Sabretooth',
  'She-Hulk (Jennifer Walters)',
  'Wolfsbane',
  'Iceman (X-Men: Battle of the Atom)',
  'Wolverine (X-Men: Battle of the Atom)',
  'Rogue (X-Men: Battle of the Atom)',
  'Magneto (X-Men: Battle of the Atom)',
  'Kitty Pryde (X-Men: Battle of the Atom)',
  'Deadpool (X-Men: Battle of the Atom)',
  'Cyclops (X-Men: Battle of the Atom)',
  'Cable (X-Men: Battle of the Atom)',
  'Beast',
  'Doop',
  'Caliban',
  'Uatu The Watcher',
  'Leader',
  'Toxin (Eddie Brock)',
  'The Hand',
  'Sinister Six',
  'Goblin Queen',
  'Zzzax',
  'Marauders',
  'Supreme Intelligence',
  'Spider-Girl (Anya Corazon)',
  'Araña',
  'Rogue (Age of Apocalypse)',
  'Sersi',
  'Shriek',
  'Triton',
  'Vermin (Edward Whelan)',
  'Vulcan (Gabriel Summers)',
  'Wild Child (Age of Apocalypse)',
  'Wolfsbane (Age of Apocalypse)',
  'Wrecking Crew',
  'X-Factor Investigations',
  'Quicksilver (Age of Apocalypse)',
  'Titanium Man (Topolov)',
  'Trauma',
  'Jean Grey',
  'Juggernaut',
  'Lizard',
  'Madelyne Pryor',
  'Molecule Man',
  'Mystique (Age of Apocalypse)',
  'Namorita',
  'Power Pack',
  'Professor X',
  'Hiroim',
  'Grey Gargoyle',
  'Annihilus',
  'Beyonder',
  'Cloak',
  'Dagger',
  'Doctor Octopus',
  'Hercules',
  'Iron Patriot (James Rhodes)',
  'Madame Web (Julia Carpenter)',
  'Silver Surfer',
  'Super-Skrull',
  'Stryfe',
  'Sugar Man',
  'She-Hulk (Lyra)',
  'Stature',
  'Polaris',
  'Morlun',
  'New Warriors',
  'Phalanx',
  'Purifiers',
  'Quasar (Phyla-Vell)',
  'Quasar (Wendell Vaughn)',
  'Rachel Grey',
  'Rick Jones',
  'Lilith',
  'Lilandra',
  'Kraven the Hunter',
  'Madrox',
  'Mad Thinker',
  'Mantis',
  'Maximus',
  'Loa',
  'Miek',
  'Banshee',
  'Layla Miller',
  'Colleen Wing',
  'Elixir',
  'Enchantress (Amora)',
  'Force Works',
  'Geiger',
  'The Initiative',
  'Jane Foster',
  'Ultragirl (Earth-93060)',
  'Black Bolt',
  'Absorbing Man',
  'Sin',
  'Kang',
  'Invisible Woman',
  'Magik (Illyana Rasputin)',
  'Sue Storm',
  'Sentry (Robert Reynolds)',
  'Tigra (Greer Nelson)',
  'Thor Girl',
  'Taskmaster',
  'Penance (Robert Baldwin)',
  'Korg',
  'High Evolutionary',
  'Forge',
  'Sabretooth (Age of Apocalypse)',
  'Crystal',
  'Exodus',
  'Elloe Kaifi',
  'Diamondback (Rachel Leighton)',
  'Crimson Dynamo',
  'Cloud 9',
  'Darkhawk',
  'Agent Brand',
  'Alpha Flight',
  'Arachne',
  'Bastion',
  'Blastaar',
  'Bengal',
  'Bishop',
  'Havok',
  'Doc Samson',
  'Ultron',
  'Human Torch',
  'Vanisher (Age of Apocalypse)',
  'Kitty Pryde',
  'Archangel',
  'Warpath',
  'Secret Warriors',
  'Nightcrawler',
  'M.O.D.O.K.',
  'Klaw',
  'Kingpin',
  'Gravity',
  'Groot',
  'Illuminati',
  'Joseph',
  'Drax',
  'Dark Avengers',
  'Firestar',
  'Brood',
  'Captain Marvel (Mar-Vell)',
  'Death',
  'Beta-Ray Bill',
  'Dark Beast',
  'A.I.M.',
  'Pyro',
  'Blade',
  'Sub-Mariner',
  'Iron Man (LEGO Marvel Super Heroes)',
  'Iron Fist (USM)',
  'Nova (USM)',
  'Power Man (USM)',
  'Ultimate Spider-Man (USM)',
  'A-Bomb (HAS)',
  'Red Hulk (HAS)',
  'She-Hulk (HAS)',
  'Skaar (HAS)',
  'Devil Dinosaur (HAS)',
  'The Leader (HAS)',
  'Falcon/Sam Wilson (MAA)',
  'Black Widow/Natasha Romanoff (MAA)',
  'Hulk/Bruce Banner (MAA)',
  'Captain America/Steve Rogers (MAA)',
  'Thor (MAA)',
  'Iron Man/Tony Stark (MAA)',
  'Hawkeye/Clint Barton (MAA)',
  'White Tiger (USM)',
  'Deadpool (LEGO Marvel Super Heroes)',
  'Loki (LEGO Marvel Super Heroes)',
  'Spider-Man (LEGO Marvel Super Heroes)',
  'Wolverine (LEGO Marvel Super Heroes)',
  'Hulk (LEGO Marvel Super Heroes)',
  'Captain America (LEGO Marvel Super Heroes)',
  'Black Widow (LEGO Marvel Super Heroes)',
  'Rogue (Deadpool)',
  'Mister Sinister (Deadpool)',
  'Deadpool (Deadpool)',
  'Cable (Deadpool)',
  'War Machine (Iron Man 3 - The Official Game)',
  'M.O.D.O.K. (Iron Man 3 - The Official Game)',
  'Iron Man (Iron Man 3 - The Official Game)',
  'Crimson Dynamo (Iron Man 3 - The Official Game)',
  'Black Bolt (Marvel War of Heroes)',
  'Captain America (Marvel War of Heroes)',
  'Gamora (Marvel War of Heroes)',
  'Ghost Rider (Marvel War of Heroes)',
  'Iron Man (Marvel War of Heroes)',
  'She-Hulk (Marvel War of Heroes)',
  'Wolverine (Marvel War of Heroes)',
  'Thor (Marvel War of Heroes)',
  'Daredevil (Marvel Heroes)',
  'Hawkeye (Marvel Heroes)',
  'Iron Man (Marvel Heroes)',
  'Rocket Raccoon (Marvel Heroes)',
  'Scarlet Witch (Marvel Heroes)',
  'Storm (Marvel Heroes)',
  'Thing (Marvel Heroes)',
  'Thor (Marvel Heroes)',
  'Cable (Marvel: Avengers Alliance)',
  'Dr. Strange (Marvel: Avengers Alliance)',
  'Hulk (Marvel: Avengers Alliance)',
  'Invisible Woman (Marvel: Avengers Alliance)',
  'Punisher (Marvel: Avengers Alliance)',
  'Spider-Man (Marvel: Avengers Alliance)',
  'Thor (Marvel: Avengers Alliance)',
  'War Machine (Marvel: Avengers Alliance)',
  'Nick Fury (LEGO Marvel Super Heroes)',
  'Daredevil (LEGO Marvel Super Heroes)',
  'Hulk (HAS)',
  'Spectrum',
  'Spider-Man (2099)',
  'Daken',
  'Amadeus Cho',
  'Adam Warlock',
  'Dani Moonstar',
  'Silver Samurai',
  'The 198',
  'Professor X (Ultimate)',
  'Norman Osborn',
  'Mr. Fantastic',
  'Hope Summers',
  'Red Hulk',
  'Young Avengers',
  'Thunderbolts',
  'Karma',
  'Big Wheel',
  'Speed Demon',
  'Shocker (Herman Schultz)',
  'Scarlet Spider (Kaine)',
  'Stacy X',
  'Daimon Hellstrom',
  'Dreaming Celestial',
  'Spider-Man (Takuya Yamashiro)',
  'Spider-Man (Ai Apaec)',
  'Rick Jones (Ultimate)',
  'Wong (Ultimate)',
  'Stacy X (Ultimate)',
  'Skrulls (Ultimate)',
  'Shang-Chi (Ultimate)',
  'Reavers (Ultimate)',
  'Clea (Ultimate)',
  'Moon Knight (Ultimate)',
  'Deathstrike (Ultimate)',
  'Hellfire Club (Ultimate)',
  'Hammerhead (Ultimate)',
  'Gwen Stacy (Ultimate)',
  'Forge (Ultimate)',
  'Dormammu (Ultimate)',
  'Crusher Hogan (Ultimate)',
  'George Stacy (Ultimate)',
  'Brotherhood of Mutants (Ultimate)',
  'Avengers (Ultimate)',
  'Ancient One (Ultimate)',
  'Abomination (Ultimate)',
  'X-Men (Ultimate)',
  'Dazzler',
  'Carol Danvers',
  'Angel (Warren Worthington III)',
  'Northstar',
  "T'Challa",
  'Tony Stark',
  'Reptil',
  'Whirlwind',
  'H.E.R.B.I.E.',
  'Arnim Zola',
  'Abomination (Emil Blonsky)',
  'Baron Strucker',
  'Mole Man',
  'The Captain',
  'Armor (Hisako Ichiki)',
  'Sebastian Shaw',
  'The Twelve',
  'Harry Osborn',
  'Senator Kelly',
  'Two-Gun Kid',
  'Scarlet Spider (Ben Reilly)',
  'Captain Britain',
  'Machine Man',
  'Bruce Banner',
  'Typhoid Mary',
  'Bob, Agent of Hydra',
  'Bucky',
  'Shatterstar',
  'Strong Guy',
  'Betty Ross',
  'Leech',
  'Artiee',
  'Dragon Man',
  'Valeria Richards',
  'Alex Power',
  'Sentinel',
  'William Stryker',
  'Stepford Cuckoos',
  'Surge',
  'Pixie',
  'Psycho-Man',
  'Lady Bullseye',
  'Crossbones',
  'Terrax',
  'Giant Man',
  'Toro (Thomas Raymond)',
  'Wiccan',
  'Longshot',
  'Peter Parker',
  'Carlie Cooper',
  'Sasquatch (Walter Langkowski)',
  'Namora',
  'Blonde Phantom',
  'M (Monet St. Croix)',
  'Foggy Nelson',
  'Fixer (Paul Norbert Ebersol)',
  'Songbird',
  'Satana',
  'Snowbird',
  'Puck',
  'Wonder Man',
  'Goliath (Bill Foster)',
  'Edwin Jarvis',
  'Dum Dum Dugan',
  'Pet Avengers',
  'Magik (Amanda Sefton)',
  'Sunspot',
  'Warlock (Technarchy)',
  'Shadowcat',
  'Colossus (Ultimate)',
  'Vindicator',
  'Purple Man',
  'Azazel (Mutant)',
  'Frog-Man',
  'Corsair',
  'Chamber',
  'Jocasta',
  "Tiger's Beautiful Daughter",
  'Dog Brother #1',
  'Bride of Nine Spiders (Immortal Weapons)',
  'Fat Cobra',
  'Prince of Orphans',
  'Sentinels',
  'Wendigo',
  'Bi-Beast',
  'Fin Fang Foom',
  'Tyrannus',
  'Sabretooth (Ultimate)',
  'In-Betweener',
  'Mach IV',
  'Guardian',
  'Mastermind',
  'Ultimates',
  "Frankenstein's Monster",
  'Nighthawk',
  'Howard The Duck',
  'Man-Thing',
  'Jackal',
  'Aurora',
  'Shaman',
  'Doctor Spectrum',
  'Mary Jane Watson (Ultimate)',
  'Super Hero Squad',
  'Dark Phoenix',
  'Moira MacTaggert',
  'Cannonball',
  'Shadow King',
  'Shanna the She-Devil',
  'Banshee (Theresa Rourke)',
  'Ben Grimm',
  'Firestar (Ultimate)',
  'Korvac',
  'Hulkling',
  'Speed',
  'Iron Lad',
  'Patriot',
  'Hellcat (Patsy Walker)',
  'Steve Rogers',
  'Batroc the Leaper',
  'Cypher',
  'Magma (Amara Aquilla)',
  'Skaar',
  'Baron Zemo (Helmut Zemo)',
  'Union Jack (Joseph Chapman)',
  'Madame Hydra',
  'Blob',
  'Spitfire',
  'Hobgoblin (Roderick Kingsley)',
  'Ulik',
  'Mysterio',
  'Maestro',
  'Redwing',
  'Viper',
  'Gargoyle (Yuri Topolov)',
  'Thunderbolt Ross',
  'Ozymandias',
  'Invisible Woman (Ultimate)',
  'Thing (Ultimate)',
  'Ender Wiggin',
  'Dormammu',
  'Marvel Zombies',
  'Chat',
  'Heroes For Hire',
  'Nomad (Rikki Barnes)',
  'Alice',
  'Prima',
  'Lester',
  'Firedrake',
  'The Hunter',
  'Weapon Omega',
  'Green Goblin (Barry Norman Osborn)',
  'Mr. Meugniot',
  "Karen O'Malley",
  'Git Hoskins',
  'Bromley',
  'Lord Tyger',
  'Shane Yamada-Jones',
  'Naoko',
  'Lady Ursula',
  'Lady Vermin',
  'Sir Ram',
  'Firelord',
  'Exiles',
  'Donald Blake',
  'Chase Stein',
  'Cecilia Reyes',
  'Marcus Van Sciver',
  'Krista Starr',
  'Shen',
  'Justin Hammer',
  'Brother Voodoo',
  'Avalanche',
  'John Jameson',
  'Jigsaw',
  'Happy Hogan',
  'Gorilla Man',
  'Danny Rand',
  'Master Chief',
  'Gargoyle',
  'Anita Blake',
  'Nemesis',
  'Wilson Fisk',
  'Gunslinger',
  'Echo',
  'Roland Deschain',
  'Jamie Braddock',
  'Frank Castle',
  'James Buchanan Barnes',
  'Jessica Drew',
  'Orphan-Maker',
  'Wild Child',
  'Scalphunter',
  'Empath',
  'Hepzibah',
  'Meggan',
  'Daily Bugle',
  'Pete Wisdom',
  'Raza',
  'Askew-Tronics',
  'Cargill',
  'Firebrand',
  'Deathbird',
  'Hemingway',
  'Marrow',
  'Robbie Robertson',
  'Serpent Society',
  'Stark Industries',
  'Trish Tilby',
  'Caretaker',
  'Lightspeed',
  'Rockslide',
  'Hulk-dok',
  'Man-Wolf',
  'Mr. Immortal',
  'Masked Marvel (Unrevealed)',
  'Millie the Model',
  'Hobgoblin (Jason Macendale)',
  'M.O.D.A.M.',
  'Captain Universe',
  "D'Ken Neramani",
  'Killraven',
  'Salo',
  'Mentor',
  'Gamma Corps',
  'The Fury',
  'Freak',
  'Maverick (Christoph Nord)',
  'Warbird',
  'Peter Quill',
  'Kate Bishop',
  'Jack Power',
  'ClanDestine',
  'Ink',
  'Charlie Campion',
  'Iron Cross Army',
  'Romulus',
  'Marvex',
  'Yellow Claw',
  'Big Bertha',
  'Tarantula (Luis Alvarez)',
  "Matsu'o Tsurayaba",
  'Shadowcat (Ultimate)',
  'Silhouette',
  'Fabian Cortez',
  'Skin',
  'Holocaust (Age of Apocalypse)',
  'Talkback (Chase Stein)',
  'Agent Zero',
  'Bedlam',
  'Box',
  'Detective Soap',
  'Emplate',
  'Khan',
  'Lockheed',
  'Marvel Boy',
  'Mongu (Unrevealed)',
  'Ben Parker',
  'Proudstar',
  'Radioactive Man',
  'Shiva',
  'Morgan Stark',
  'Toad Men',
  'Stone Men',
  'Controller',
  'Violations',
  'Human Robot',
  'Excalibur',
  'Celestials',
  'Zaran',
  'Ajaxis',
  'Sharon Ventura',
  'Hobgoblin (Robin Borne)',
  'Maverick (Chris Bradley)',
  'Owl',
  'Cardiac',
  'Bloodaxe',
  'Hannibal King',
  'Roughhouse',
  'Cammi',
  'Alvin Maker',
  'Harley Davidson Cooper',
  'Ord',
  'Menace',
  'Mephistopheles',
  'Weapon X',
  'Phyla-Vell',
  'Apocalypse (Ultimate)',
  'Imp',
  'The Enforcers',
  'Junta',
  'Dakota North',
  'Garia',
  'X-Babies',
  'Adam Destine',
  'Blacklash',
  'Venus Dee Milo',
  'Union Jack (Montgomery Falsworth)',
  'Thunderball',
  'Shadu the Shady',
  'Silver Fox',
  'Skreet',
  'Stark Industries',
  'Trish Tilby',
  'Caretaker',
  'Lightspeed',
  'Rockslide',
  'Hulk-dok',
  'Man-Wolf',
  'Mr. Immortal',
  'Masked Marvel (Unrevealed)',
  'Millie the Model',
  'Hobgoblin (Jason Macendale)',
  'M.O.D.A.M.',
  'Captain Universe',
  "D'Ken Neramani",
  'Killraven',
  'Salo',
  'Mentor',
  'Gamma Corps',
  'The Fury',
  'Freak',
  'Maverick (Christoph Nord)',
  'Warbird',
  'Peter Quill',
  'Kate Bishop',
  'Jack Power',
  'ClanDestine',
  'Ink',
  'Charlie Campion',
  'Iron Cross Army',
  'Romulus',
  'Marvex',
  'Yellow Claw',
  'Big Bertha',
  'Tarantula (Luis Alvarez)',
  "Matsu'o Tsurayaba",
  'Shadowcat (Ultimate)',
  'Silhouette',
  'Fabian Cortez',
  'Skin',
  'Holocaust (Age of Apocalypse)',
  'Talkback (Chase Stein)',
  'Agent Zero',
  'Bedlam',
  'Box',
  'Detective Soap',
  'Emplate',
  'Khan',
  'Lockheed',
  'Marvel Boy',
  'Mongu (Unrevealed)',
  'Ben Parker',
  'Proudstar',
  'Radioactive Man',
  'Shiva',
  'Morgan Stark',
  'Toad Men',
  'Stone Men',
  'Controller',
  'Violations',
  'Human Robot',
  'Excalibur',
  'Celestials',
  'Zaran',
  'Ajaxis',
  'Sharon Ventura',
  'Hobgoblin (Robin Borne)',
  'Maverick (Chris Bradley)',
  'Owl',
  'Cardiac',
  'Bloodaxe',
  'Hannibal King',
  'Roughhouse',
  'Cammi',
  'Alvin Maker',
  'Harley Davidson Cooper',
  'Ord',
  'Menace',
  'Mephistopheles',
  'Weapon X',
  'Phyla-Vell',
  'Apocalypse (Ultimate)',
  'Imp',
  'The Enforcers',
  'Junta',
  'Dakota North',
  'Garia',
  'X-Babies',
  'Adam Destine',
  'Blacklash',
  'Venus Dee Milo',
  'Union Jack (Montgomery Falsworth)',
  'Thunderball',
  'Shadu the Shady',
  'Silver Fox',
  'Skreet',
  'Diablo',
  'Electro (Ultimate)',
  'Human Fly (Richard Deacon)',
  'Talon (Fraternity of Raptors)',
  'Skullbuster (Cylla Markham)',
  'Blackheart',
  'Catseye',
  'Crule',
  'Husk',
  'Gabe Jones',
  'Lake',
  'Mesmero',
  'Mr. Bumpo',
  'Cassandra Nova',
  'Plazm',
  'Howard Saint',
  'The Phantom',
  'Nextwave',
  'Justice',
  'Frightful Four',
  'Network',
  'Black Crow',
  'Piledriver',
  'Longshot (Ultimate)',
  'Lieutenant Marcus Stone',
  'Great Lakes Avengers',
  'Inertia',
  'Deviants',
  'Mystique (Ultimate)',
  'Paibok',
  'Cuthbert',
  'Akemi',
  'The Renegades',
  'Mac Gargan',
  'Amora',
  'Zemo',
  'Hypno-Hustler',
  'Vin Gonzales',
  'Lords of Avalon',
  "Salem's Seven (Ultimate)",
  'Blackout',
  'MS2',
  'Nine-Fold Daughters of Xao',
  'Zombie (Simon Garth)',
  'Wallow',
  'Vector',
  'Blockbuster',
  'Molly Hayes',
  'Captain Britain (Ultimate)',
  'Tombstone',
  'Scrambler',
  'Boom Boom',
  'Captain Stacy',
  'Stranger',
  'Guardsmen',
  'Vertigo (Savage Land Mutate)',
  'Squadron Supreme (Earth-712)',
  'Cerebro',
  'Crusher Hogan',
  'Hussar',
  'Landau',
  'Ma Gnuci',
  'Metal Master',
  'Sandman',
  'The Professor',
  'X-Cutioner',
  'Silver Centurion',
  'Arcana',
  'Zarda',
  'Jack Flag',
  'Pip',
  'Flatman',
  'Moira MacTaggert (Ultimate)',
  'Dirk Anger',
  'Tag',
  'Epoch',
  'Major Mapleleaf',
  'Praxagora',
  'Aginar',
  'Dorian Gray',
  'Feral',
  'Julian Keller',
  'Robert Baldwin ',
  'Dragon Lord',
  'Bill Hollister',
  'Generation X',
  'Dargo Ktor',
  'Randall Flagg',
  'Marvel Apes',
  'Sons of the Tiger',
  'Hairball',
  'Confederates of the Curious',
  'Zuras',
  'Veda',
  'Bulldozer',
  'Screwball',
  'Shinobi Shaw',
  'Meltdown',
  'Swordsman (Jaques Duquesne)',
  'Half-Life (Tony Masterson)',
  'Lenny Balinger',
  'Hammerhead',
  'Hydra',
  'Eddie Lau',
  'Micro/Macro',
  'Shiva',
  'Morgan Stark',
  'Toad Men',
  'Stone Men',
  'Controller',
  'Violations',
  'Human Robot',
  'Excalibur',
  'Celestials',
  'Zaran',
  'Ajaxis',
  'Sharon Ventura',
  'Hobgoblin (Robin Borne)',
  'Maverick (Chris Bradley)',
  'Owl',
  'Cardiac',
  'Bloodaxe',
  'Hannibal King',
  'Roughhouse',
  'Cammi',
  'Alvin Maker',
  'Harley Davidson Cooper',
  'Ord',
  'Menace',
  'Mephistopheles',
  'Weapon X',
  'Phyla-Vell',
  'Apocalypse (Ultimate)',
  'Imp',
  'The Enforcers',
  'Junta',
  'Dakota North',
  'Garia',
  'X-Babies',
  'Adam Destine',
  'Blacklash',
  'Venus Dee Milo',
  'Union Jack (Montgomery Falsworth)',
  'Thunderball',
  'Shadu the Shady',
  'Silver Fox',
  'Skreet',
  'Diablo',
  'Electro (Ultimate)',
  'Human Fly (Richard Deacon)',
  'Talon (Fraternity of Raptors)',
  'Skullbuster (Cylla Markham)',
  'Beef',
  'Curt Conners',
  'Gateway',
  'Carol Hines',
  'Lockjaw',
  'Moondragon',
  'Prowler',
  'Raider',
  'Shotgun',
  'Sumo',
  'Tusk',
  'Tomorrow Man',
  'Mr. Hyde',
  'Maddog',
  'Nico Minoru',
  'New Goblin',
  'King Cobra',
  'Micromax',
  'Lyja',
  'Mister Sinister (House of M)',
  'Nick Fury (Ultimate)',
  'Kulan Gath',
  'Maelstrom',
  'Centurions',
  'pug',
  'Leo (Zodiac)',
  'Giant Girl',
  'Mandrill',
  'Matthew Murdock',
  'Charles Xavier',
  'Wendell Vaughn',
  'Stephen Strange',
  'Mister Sinister (Ultimate)',
  'Hex',
  'U-Foes',
  'Shinko Yamashiro',
  'H.A.M.M.E.R.',
  'Phantom Reporter',
  'Aegis (Trey Rollins)',
  'Warstar',
  'Unus',
  'Thena',
  'Turbo',
  'Cottonmouth',
  'Stellaris',
  'Ken Ellis',
  'Hyperion (Earth-712)',
  'Thaddeus Ross',
  'Smasher (Vril Rokk)',
  'Beetle (Abner Jenkins)',
  'Constrictor',
  'Hitman',
  'Iron Monger',
  'Wallop',
  'Whizzer (Stanley Stewart)',
  'Blazing Skull',
  'Blob (Ultimate)',
  'Brute',
  'Scorpion (Carmilla Black)',
  'Malcolm Colcord',
  'Virginia Dare',
  'Franklin Storm',
  'Sway',
  'Zodiak',
  'Vanisher (Telford Porter)',
  'Scarecrow (Ebenezer Laughton)',
  'Spiral (Rita Wayword)',
  'Blackheart',
  'Catseye',
  'Crule',
  'Husk',
  'Gabe Jones',
  'Lake',
  'Mesmero',
  'Mr. Bumpo',
  'Cassandra Nova',
  'Plazm',
  'Gene Sailors',
  'Spacker Dave',
  'The Fallen',
  'Wildside',
  'Lionheart',
  'Meteorite',
  'Santa Claus',
  'Colonel America',
  'Armory',
  'Silk Fever',
  'Doctor Octopus (Ultimate)',
  'Lizard (Ultimate)',
  'The Order',
  'Dinah Soar',
  'Pride',
  'Sally Floyd',
  'Tana Nile',
  'Marten Broadcloak',
  'Kabuki',
  'Mulholland Black',
  'Malice (Earth-161)',
  'Amanda Sefton',
  'Warren Worthington III',
  'James Howlett',
  'Butterfly',
  'Dexter Bennett',
  'Night Nurse (Earth-9997)',
  'Next Avengers',
  'Alpha Flight (Ultimate)',
  'Ricochet',
  'Nine-Fold Daughters of Xao',
  'Zombie (Simon Garth)',
  'Wallow',
  'Vector',
  'Blockbuster',
  'Molly Hayes',
  'Captain Britain (Ultimate)',
  'Tombstone',
  'Scrambler',
  'Boom Boom',
  'Captain Stacy',
  'Stranger',
  'Guardsmen',
  'Vertigo (Savage Land Mutate)',
  'Squadron Supreme (Earth-712)',
  'Cerebro',
  'Crusher Hogan',
  'Hussar',
  'Landau',
  'Ma Gnuci',
  'Metal Master',
  'Howard Saint',
  'The Phantom',
  'Nextwave',
  'Justice',
  'Frightful Four',
  'Network',
  'Black Crow',
  'Piledriver',
  'Longshot (Ultimate)',
  'Lieutenant Marcus Stone',
  'Great Lakes Avengers',
  'Inertia',
  'Deviants',
  'Mystique (Ultimate)',
  'Paibok',
  'Cuthbert',
  'Akemi',
  'The Renegades',
  'Mac Gargan',
  'Amora',
  'Zemo',
  'Hypno-Hustler',
  'Vin Gonzales',
  'Lords of Avalon',
  "Salem's Seven (Ultimate)",
  'Joystick',
  'Multiple Man',
  'Ikaris',
  'Xavin',
  'Glorian',
  'Ser Duncan',
  'Deena Pilgrim',
  'Madripoor',
  'Bishop (Ultimate)',
  'Otto Octavius',
  'Victor Von Doom',
  'Princess Powerful',
  'Nomad (Steve Rogers)',
  "Cap'n Oz",
  'Iron Fist (Bei Bang-Wen)',
  'Magus (Technarch)',
  'Hitomi Sakuma',
  'Wendell Rand',
  'Lethal Legion',
  'Alain',
  'Arsenic',
  'Wither',
  'Vampiro',
  'Unus (House of M)',
  'Calypso',
  'Thundra',
  'Cuckoo',
  'Slapstick',
  'Stick',
  'X-Ray (James Darnell)',
  'Solo (James Bourne)',
  'Doomsday Man',
  'Jetstream',
  'Alicia Masters',
  'Nocturne',
  'PsyNapse',
  'Russian',
  'Jasper Sitwell',
  'Tarot',
  'Monster Badoon',
  'Elements of Doom',
  'Hellion',
  'Spider-dok',
  'Karolina Dean ',
  'Kat Farrell',
  'Texas Twister',
  'Bloodstrike',
  'Mathemanic',
  'Mysterio (Daniel Berkhart)',
  'Fantastic Four (Ultimate)',
  'Kylun',
  'Mentallo',
  'Lord Hawal',
  'Sheva Callister',
  'Retro Girl',
  'Doctor Faustus',
  'Stryfe (Ultimate)',
  'Johnny Blaze',
  'Iron Patriot',
  'Lucy in the Sky',
  'Captain Marvel (Monica Rambeau)',
  'Gladiator (Melvin Potter)',
  'Young X-Men',
  'M.O.D.O.G.',
  'Nightcrawler (Ultimate)',
  'Galia',
  'Lei Kung, The Thunderer',
  'Nekra',
  'Vance Astro',
  'Mary Jane Watson (House of M)',
  'Black Cat (Ultimate)',
  'Unus (Ultimate)',
  'Tiger Shark',
  'Sabra',
  'Chimera',
  'Expediter',
  'Slayback',
  'Spirit',
  'Supernaut',
  'Energizer',
  'Arclight',
  'Black Bird',
  'Callisto',
  'Count Nefaria',
  'Fenris',
  'Holy',
  'Mauler',
  'Morg',
  'Nomad',
  'Pestilence',
  'Reaper',
  'Tempest',
  'Vivisector',
  'Overlord',
  'Black Queen',
  'Mercury',
  'Nicolaos',
  'The Executioner',
  'Champions',
  'Jack Murdock',
  'Network',
  'Black Crow',
  'Piledriver',
  'Longshot (Ultimate)',
  'Lieutenant Marcus Stone',
  'Great Lakes Avengers',
  'Inertia',
  'Deviants',
  'Mystique (Ultimate)',
  'Paibok',
  'Cuthbert',
  'Akemi',
  'The Renegades',
  'Mac Gargan',
  'Amora',
  'Zemo',
  'Hypno-Hustler',
  'Vin Gonzales',
  'Lords of Avalon',
  "Salem's Seven (Ultimate)",
  'Blackout',
  'MS2',
  'Nine-Fold Daughters of Xao',
  'Zombie (Simon Garth)',
  'Wallow',
  'Vector',
  'Blockbuster',
  'Molly Hayes',
  'Captain Britain (Ultimate)',
  'Tombstone',
  'Scrambler',
  'Boom Boom',
  'Captain Stacy',
  'Stranger',
  'Guardsmen',
  'Vertigo (Savage Land Mutate)',
  'Squadron Supreme (Earth-712)',
  'Cerebro',
  'Crusher Hogan',
  'Hussar',
  'Landau',
  'Ma Gnuci',
  'Metal Master',
  'Howard Saint',
  'The Phantom',
  'Nextwave',
  'Pip',
  'Flatman',
  'Moira MacTaggert (Ultimate)',
  'Dirk Anger',
  'Tag',
  'Epoch',
  'Major Mapleleaf',
  'Praxagora',
  'Aginar',
  'Dorian Gray',
  'Feral',
  'Julian Keller',
  'Robert Baldwin ',
  'Dragon Lord',
  'Bill Hollister',
  'Generation X',
  'Dargo Ktor',
  'Randall Flagg',
  'Marvel Apes',
  'Sons of the Tiger',
  'Hairball',
  'Confederates of the Curious',
  'Zuras',
  'Veda',
  'Bulldozer',
  'Screwball',
  'Shinobi Shaw',
  'Meltdown',
  'Swordsman (Jaques Duquesne)',
  'Half-Life (Tony Masterson)',
  'Lenny Balinger',
  'Hammerhead',
  'Hydra',
  'Eddie Lau',
  'Micro/Macro',
  'Mr. Fixit',
  'Ogun',
  'John Porter',
  'Puppet Master',
  'Rhino',
  'Sandman',
  'The Professor',
  'X-Cutioner',
  'Silver Centurion',
  'Arcana',
  'Zarda',
  'Jack Flag',
  'Puff Adder',
  'Proteus (Ultimate)',
  'Hellions (Squad)',
  'Victor Mancha',
  'The Santerians',
  'Preak',
  'Ajak',
  'Rumiko Fujikawa',
  'Hellfire Club',
  'Impossible Man',
  'Garrison Kane',
  'Liz Osborn',
  'Orphan',
  'Risque',
  'Obadiah Stane',
  'The Watchers',
  'Zeigeist',
  'Human Cannonball',
  'Microbe',
  'Giant-dok',
  'Rocket Racer',
  'Hindsight Lad',
  'Firebird',
  'Kid Colt',
  'Green Goblin (Ultimate)',
  'Puck (Zuzha Yu)',
  'Harrier',
  'Imperfects',
  'Tattoo',
  'Maginty',
  'Red Shift',
  'Luminals',
  'Harry Osborn (Ultimate)',
  'Rhodey',
  'Clint Barton',
  'Newton Destine',
  'Greymalkin',
  'Revanche',
  'Professor Monster',
  'Killer Shrike',
  'Abyss (Age of Apocalypse)',
  'Amun',
  'Mariko Yashida',
  'Betty Brant',
  'Wrecker',
  'Union Jack (Brian Falsworth)',
  'Talos',
  'Bushwacker',
  'Starfox',
  'Talisman (Elizabeth Twoyoungmen)',
  'Stingray (Walter Newell)',
  'Becatron',
  'Boomer',
  'Albert Cleary',
  'Deathbird',
  'Hemingway',
  'Marrow',
  'Robbie Robertson',
  'Serpent Society',
  'Stark Industries',
  'Trish Tilby',
  'Caretaker',
  'Lightspeed',
  'Rockslide',
  'Hulk-dok',
  'Man-Wolf',
  'Mr. Immortal',
  'Masked Marvel (Unrevealed)',
  'Millie the Model',
  'Hobgoblin (Jason Macendale)',
  'M.O.D.A.M.',
  'Captain Universe',
  "D'Ken Neramani",
  'Killraven',
  'Salo',
  'Mentor',
  'Gamma Corps',
  'The Fury',
  'Freak',
  'Maverick (Christoph Nord)',
  'Warbird',
  'Peter Quill',
  'Kate Bishop',
  'Jack Power',
  'ClanDestine',
  'Ink',
  'Charlie Campion',
  'Iron Cross Army',
  'Romulus',
  'Marvex',
  'Yellow Claw',
  'Big Bertha',
  'Tarantula (Luis Alvarez)',
  "Matsu'o Tsurayaba",
  'Shadowcat (Ultimate)',
  'Silhouette',
  'Fabian Cortez',
  'Skin',
  'Holocaust (Age of Apocalypse)',
  'Talkback (Chase Stein)',
];

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Item {
  resourceURI: string;
  name: string;
}

export interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Item2 {
  resourceURI: string;
  name: string;
}

export interface Series {
  available: number;
  collectionURI: string;
  items: Item2[];
  returned: number;
}

export interface Item3 {
  resourceURI: string;
  name: string;
  type: string;
}

export interface Stories {
  available: number;
  collectionURI: string;
  items: Item3[];
  returned: number;
}

export interface Item4 {
  resourceURI: string;
  name: string;
}

export interface Events {
  available: number;
  collectionURI: string;
  items: Item4[];
  returned: number;
}

export interface Url {
  type: string;
  url: string;
}

interface HeroesResult {
  id: number;
  name: string;
  description: string;
  modified: Date;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Events;
  urls: Url[];
}

interface Data {
  offset: 0;
  limit: 20;
  total: 1493;
  count: 20;
  results: HeroesResult[];
}

type OrderBy = 'name' | '-name' | 'modified' | '-modified';

interface CharactersApiProps {
  limit: number;
  offset: number;
  orderBy: OrderBy;
  name?: string;
}

const SpanRightColumn = styled.span`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const CheckboxChildren = styled(SpanRightColumn)`
  p {
    margin-left: 10px;
  }
`;

const SectionHeaderStyled = styled.header`
  margin: 20px 40px;
`;

const SectionHeader2 = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 20px;
  }

  p {
    color: rgba(0, 0, 0, 0.6);
  }

  div {
  }
`;

function HeroesList() {
  const publicKey = '75b68a884f36ba6b7d251c6bcbe88f8d';
  const url = 'https://gateway.marvel.com:443/v1/public/characters';
  const [pageSize] = useState(20);
  const deboucePageSize = useDebounce(pageSize, 1000);
  const [orderBy, setOderBy] = useState<OrderBy>('-modified');
  const [search, setSeach] = useState('');
  const debouceSearch = useDebounce(search, 1000);
  const [isSugestionsOpen, setIsSugestionOpen] = useState(false);

  const [possibleHeroes, setPossibleHeroes] = useState<string[]>([]);
  const [favorites] = useLocalStorage(`favorites`, []);
  const isMaxFavorites = favorites.length >= 5;

  const { data, isValidating, size, setSize } = useSWRInfinite<
    Data,
    AxiosError
  >(
    (index) => [index, orderBy, deboucePageSize, debouceSearch],
    (index: number) => {
      const customParams: CharactersApiProps = {
        limit: deboucePageSize,
        offset: index === 0 ? 0 : index * pageSize,
        orderBy,
      };

      if (debouceSearch !== '') customParams.name = debouceSearch;

      const params = { ...customParams, apikey: publicKey };

      return Axios.get(url, { params: params }).then((response) => {
        return response.data.data;
      });
    }
  );

  const handleSearch = (value: string) => {
    setSeach(value);

    const possibleHero: string[] = value
      ? allHeroesIn05Nov2020.reduce(
          (accumulator: string[], currentValue: string) => {
            if (accumulator.length > 14) {
              return accumulator;
            }
            if (
              currentValue
                .toLocaleLowerCase()
                .includes(value.toLocaleLowerCase())
            ) {
              return [...accumulator, currentValue];
            }
            return accumulator;
          },
          []
        )
      : [];

    setPossibleHeroes([value, ...possibleHero]);
    setIsSugestionOpen(true);
  };

  const handleOrderBy = () => {
    setOderBy(orderBy === '-modified' ? 'name' : '-modified');
  };

  const handleButtonClick = (favorited: boolean, heroId: number) => {
    if (!favorited && !isMaxFavorites) {
      writeStorage(`favorites`, [...favorites, heroId]);
    } else {
      writeStorage(
        'favorites',
        favorites.filter((favorite) => favorite !== heroId)
      );
    }
  };

  const infiniteRef = useInfiniteScroll({
    loading: isValidating,
    hasNextPage: size * pageSize <= (data ? data[0].total : 0),
    onLoadMore: () => setSize(size + 1),
  });

  return (
    <div>
      <SectionHeader2>
        <header>
          <MarvelHeaderLogo width="228px" />
          <h1>EXPLORE O UNIVERSO</h1>
        </header>
        <main>
          <p>
            Mergule no domínio deslubrante de todos os personagens clássicos que
            você ama - e aqueles que você descobrirá em breve!
          </p>
          <div style={{marginTop: '30px'}}>
            <SearchInput
              isSugestionsOpen={isSugestionsOpen}
              label="Procure por heróis"
              name="hero-search"
              sugestions={possibleHeroes}
              value={search}
              onChange={(value) => handleSearch(value)}
              onSugestionClick={(sugestion) => {
                setIsSugestionOpen(false);
                setSeach(sugestion);
              }}
            />
          </div>
        </main>
      </SectionHeader2>
      <section ref={infiniteRef as any}>
        <SectionHeaderStyled>
          <SectionHeader
            leftColumn={
              <p>Encontrados {pageSize * (data?.length || 1)} heróis </p>
            }
            rightColumn={
              <>
                <SpanRightColumn>
                  <CheckboxToggle
                    checked={orderBy.includes('name')}
                    onClick={handleOrderBy}
                  >
                    <CheckboxChildren>
                      <HeroLogo />
                      <p>Ordernar por nome - A/Z</p>
                    </CheckboxChildren>
                  </CheckboxToggle>
                </SpanRightColumn>
                <SpanRightColumn>
                  <ButtonHeart disabled={false} value={true}>
                    Somente Favoritos
                  </ButtonHeart>
                </SpanRightColumn>
              </>
            }
          />
        </SectionHeaderStyled>
        <main
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            margin: '0 40px',
          }}
        >
          {data?.map((heros) =>
            heros.results.map((hero) => {
              const favorited =
                favorites.filter((favorite) => favorite === hero.id).length > 0;
              const disabled = isMaxFavorites && !favorited;
              return (
                <HeroCard
                  height="210px"
                  width="210px"
                  alt={hero.name}
                  linkTo={`hero/${hero.id}`}
                  imageSrc={
                    hero.thumbnail.path + '.' + hero.thumbnail.extension
                  }
                  name={hero.name}
                  favorite={favorited}
                  disabled={disabled}
                  onClick={() => handleButtonClick(favorited, hero.id)}
                  key={hero.id}
                />
              );
            })
          )}
        </main>
      </section>
    </div>
  );
}

export default HeroesList;
