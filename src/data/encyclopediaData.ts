import { EncyclopediaDisease } from '../types/disease';
import earlyBlightImg from '../assets/images/sample_early_blight_1791464799636.jpg';
import lateBlightImg from '../assets/images/sample_late_blight_1791464824051.jpg';
import septoriaImg from '../assets/images/sample_septoria_spot_1791464851414.jpg';
import healthyLeafImg from '../assets/images/sample_healthy_leaf_1791464835995.jpg';

export const TOMATO_DISEASES: EncyclopediaDisease[] = [
  {
    id: 'early-blight',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    category: 'Fungal',
    severityGrade: 'Moderate',
    sampleImageUrl: earlyBlightImg,
    commonSymptoms: [
      'Brown to black spots with distinct concentric rings creating a "target-board" pattern',
      'Yellow chlorotic halos surrounding developing lesions',
      'Begins on oldest lower leaves touching or close to soil',
      'Defoliation progresses upward, exposing green fruit to sunscald'
    ],
    causes: 'Soil-borne fungal spores splashed onto foliage during heavy rain or overhead irrigation. Favored by warm temperatures (24-30°C / 75-86°F) and wet leaf conditions.',
    typicalOnset: 'Early to mid-summer, typically following fruit set when plant energy is heavily taxed.',
    organicRemedy: 'Prune off lower 12-18 inches of affected leaves. Apply Liquid Copper Fungicide (copper octanoate) or Bacillus amyloliquefaciens biofungicide every 7-10 days.',
    chemicalOption: 'Chlorothalonil (e.g., Daconil) or Mancozeb applied as a protective barrier before rain events.',
    prevention: 'Apply 2-3 inches of straw mulch under plants to block soil splash. Water only at root zone with drip lines. Space plants 24-36 inches apart for airflow.'
  },
  {
    id: 'late-blight',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    category: 'Fungal',
    severityGrade: 'Critical',
    sampleImageUrl: lateBlightImg,
    commonSymptoms: [
      'Irregular, dark, water-soaked greasy lesions on leaves and petioles',
      'White cottony or velvety fungal sporulation on leaf undersides in high humidity',
      'Entire stems collapse quickly; dark brown firm sunken lesions on green and ripe fruit',
      'Rapid death of entire plant within 7-14 days if untreated'
    ],
    causes: 'Airborne sporangia carried for miles on cool, humid winds. Thrives in cool, damp conditions (15-22°C / 60-72°F) with prolonged foliage wetness.',
    typicalOnset: 'Late summer into cool autumn rains, or sudden unseasonably cool, overcast spells.',
    organicRemedy: 'Immediate copper hydroxide spray to protect unaffected tissue. Highly infected plants must be bagged and destroyed—do NOT compost.',
    chemicalOption: 'Targeted oomycete fungicides such as Cymoxanil, Propamocarb, or Azoxystrobin applied immediately at first sign.',
    prevention: 'Plant certified disease-resistant varieties (Defiant PhR, Mountain Merit, Mountain Magic). Never compost infected solanaceous debris.'
  },
  {
    id: 'septoria-leaf-spot',
    name: 'Septoria Leaf Spot',
    scientificName: 'Septoria lycopersici',
    category: 'Fungal',
    severityGrade: 'Moderate',
    sampleImageUrl: septoriaImg,
    commonSymptoms: [
      'Numerous small circular spots (1.5 - 3 mm diameter)',
      'Dark brown outer margins with light gray to tan sunken centers',
      'Tiny black speckles (pycnidia fruiting bodies) visible in center with magnifying lens',
      'Severe yellowing of leaf tissue between spots leading to leaf drop'
    ],
    causes: 'Fungal spores overwintering on crop debris in soil. Spread via windblown rain, overhead sprinklers, and contaminated pruning tools.',
    typicalOnset: 'Anytime during the growing season with persistent wet weather and moderate heat (20-25°C).',
    organicRemedy: 'Potassium bicarbonate (3 tbsp per gallon with mild castile soap) or copper fungicide. Strip off lower infected leaves.',
    chemicalOption: 'Chlorothalonil or Copper Hydroxide reapplied every 7 to 10 days.',
    prevention: 'Strict 3-year crop rotation away from solanaceous plants (tomatoes, peppers, eggplants, potatoes). Stake or cage plants early.'
  },
  {
    id: 'bacterial-spot',
    name: 'Bacterial Spot',
    scientificName: 'Xanthomonas perforans / euvesicatoria',
    category: 'Bacterial',
    severityGrade: 'Severe',
    commonSymptoms: [
      'Small (under 3mm) water-soaked dark spots that turn black and slightly angular',
      'Yellow halos develop around spots, eventually leaves appear ragged and torn',
      'Raised scabby blister-like spots on green tomatoes that reduce marketability',
      'Stems show elongated dark lesions'
    ],
    causes: 'Seed-borne bacteria or overwintering on plant residues. Spreads vigorously in warm, driving rainstorms and high humidity (>85%).',
    typicalOnset: 'Midsummer hot and humid thunderstorm spells.',
    organicRemedy: 'Fixed copper spray combined with Bacillus subtilis (Serenade Garden). Avoid working around plants while leaves are wet.',
    chemicalOption: 'Copper-based bactericides combined with Mancozeb (the combination increases copper ion efficacy against resistant strains).',
    prevention: 'Purchase hot-water treated or certified disease-free seeds. Disinfect trellises and stakes between seasons with 10% bleach.'
  },
  {
    id: 'blossom-end-rot',
    name: 'Blossom End Rot',
    scientificName: 'Physiological / Calcium Deficiency',
    category: 'Physiological/Abiotic',
    severityGrade: 'Low',
    commonSymptoms: [
      'Water-soaked tan spot at the blossom end (bottom) of developing green tomato',
      'Spot enlarges, flattens, and turns dark leathery black or charcoal',
      'Fruit ripens prematurely around affected area; foliage remains healthy',
      'Secondary mold may colonize the dry leathery patch'
    ],
    causes: 'Insufficient calcium uptake into rapidly expanding fruit tissue, usually triggered by irregular watering, drought stress, or root damage.',
    typicalOnset: 'Early fruiting cycle on the first clusters of tomatoes, especially in container gardens.',
    organicRemedy: 'Maintain consistent deep watering (1-2 inches per week). Mulch soil to preserve moisture. Foliar calcium spray provides minor supplemental relief.',
    chemicalOption: 'Soil drench with liquid calcium nitrate or agricultural gypsum if soil test confirms true calcium deficit.',
    prevention: 'Avoid fluctuating between dry and waterlogged soil. Test soil pH (ideal is 6.2 - 6.8 for optimal calcium availability). Avoid excessive ammonium nitrogen fertilizers.'
  },
  {
    id: 'leaf-mold',
    name: 'Leaf Mold',
    scientificName: 'Passalora fulva (Cladosporium fulvum)',
    category: 'Fungal',
    severityGrade: 'Moderate',
    commonSymptoms: [
      'Pale green to yellowish indistinct patches on upper leaf surface',
      'Velvety olive-green to grayish-brown spore layer on corresponding lower leaf surface',
      'Infected leaves wither, turn entirely brown, curl, and drop off',
      'Common in high tunnels and poorly ventilated greenhouses'
    ],
    causes: 'Prolonged high relative humidity (>85%) combined with temperatures between 21-24°C (70-75°F).',
    typicalOnset: 'Mid-to-late summer in enclosed structures or dense outdoor canopies.',
    organicRemedy: 'Increase ventilation immediately. Apply copper soap or sulfur vapor (in greenhouses). Remove affected lower foliage.',
    chemicalOption: 'Fungicides containing Azoxystrobin or Cyazofamid.',
    prevention: 'Maximize airflow with exhaust fans and horizontal air movement. Keep greenhouse relative humidity below 80%.'
  },
  {
    id: 'yellow-leaf-curl',
    name: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    scientificName: 'Begomovirus / Geminiviridae',
    category: 'Viral',
    severityGrade: 'Critical',
    commonSymptoms: [
      'Severe upward curling and cupping of leaflets into boat shapes',
      'Interveinal chlorosis (prominent yellowing) while leaf veins remain pale green',
      'Significant plant stunting with bushy, upright, bunched new growth',
      'Complete flower drop and blossom abortion; virtually zero fruit yield'
    ],
    causes: 'Transmitted exclusively by the silverleaf whitefly (Bemisia tabaci). Not transmitted mechanically by touch or seed.',
    typicalOnset: 'Any stage when whitefly populations spike in warm climates or sunny spells.',
    organicRemedy: 'No viral cure exists. Control whitefly vectors using yellow sticky cards, insecticidal soap, and organic neem horticultural oil.',
    chemicalOption: 'Systemic insecticides for vector control (Imidacloprid, Dinotefuran) subject to strict pollinator label laws.',
    prevention: 'Plant TYLCV-resistant hybrids (e.g. Tygress, Invictus). Install 50-mesh fine insect netting in nursery and greenhouse structures.'
  },
  {
    id: 'spider-mites',
    name: 'Two-Spotted Spider Mite',
    scientificName: 'Tetranychus urticae',
    category: 'Pest',
    severityGrade: 'Moderate',
    commonSymptoms: [
      'Fine yellow stippling or bronzing of leaf surface',
      'Fine silky webbing visible on leaf undersides, growing tips, and petiole junctions',
      'Leaves dry out, turn tan, and develop a papery, burnt appearance',
      'Tiny moving specks visible on leaf undersides with 10x hand lens'
    ],
    causes: 'Rapid reproduction in hot, dry, dusty conditions (temperatures >30°C / 86°F with low humidity).',
    typicalOnset: 'Mid-to-late summer heatwaves.',
    organicRemedy: 'Spray plant vigorously with water blast to dislodge mites. Apply cold-pressed neem oil (1 oz/gal) or insecticidal soap, coating leaf undersides thoroughly. Release predatory mites (Phytoseiulus persimilis).',
    chemicalOption: 'Miticides such as Bifenazate or Abamectin for severe commercial infestations.',
    prevention: 'Mist plants periodically in extreme dry heat; keep ground around tomato beds damp or mulched to suppress dust.'
  },
  {
    id: 'healthy-specimen',
    name: 'Healthy Tomato Plant',
    scientificName: 'Solanum lycopersicum L.',
    category: 'None',
    severityGrade: 'Healthy',
    sampleImageUrl: healthyLeafImg,
    commonSymptoms: [
      'Vibrant rich green leaves without chlorotic margins or necrotic spotting',
      'Stems firm, erect, and covered in protective aromatic trichomes',
      'Even flowering with sturdy pedicels and plump developing green/red fruit',
      'Normal leaf expansion and turgor pressure'
    ],
    causes: 'Optimal balance of sunlight (6-8+ hours), consistent root moisture, well-draining organic soil (pH 6.2-6.8), and balanced macro/micronutrients.',
    typicalOnset: 'Continuous throughout healthy vegetative and generative phases.',
    organicRemedy: 'Continue weekly fish-kelp foliar spray, compost tea, and proactive neem preventative spray every 14 days.',
    chemicalOption: 'No chemical intervention necessary.',
    prevention: 'Maintain routine scout monitoring, drip irrigation at the soil level, and keep foliage dry to deter spore germination.'
  }
];
