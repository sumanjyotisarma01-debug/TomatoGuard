import earlyBlightImg from '../assets/images/sample_early_blight_1791464799636.jpg';
import lateBlightImg from '../assets/images/sample_late_blight_1791464824051.jpg';
import healthyLeafImg from '../assets/images/sample_healthy_leaf_1791464835995.jpg';
import septoriaImg from '../assets/images/sample_septoria_spot_1791464851414.jpg';

export interface SampleLeaf {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  pathogenType: string;
  severity: string;
  description: string;
}

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'early_blight',
    title: 'Early Blight',
    subtitle: 'Alternaria solani',
    imageUrl: earlyBlightImg,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    description: 'Characteristic concentric target-board ring lesions with yellow chlorotic margins on lower leaves.',
  },
  {
    id: 'late_blight',
    title: 'Late Blight',
    subtitle: 'Phytophthora infestans',
    imageUrl: lateBlightImg,
    pathogenType: 'Oomycete / Fungal',
    severity: 'Critical',
    description: 'Rapidly spreading dark water-soaked lesions with white fuzzy mycelial sporulation under humid foliage.',
  },
  {
    id: 'septoria_spot',
    title: 'Septoria Leaf Spot',
    subtitle: 'Septoria lycopersici',
    imageUrl: septoriaImg,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    description: 'Abundant circular spots with dark brown margins and sunken grayish centers studded with pycnidia.',
  },
  {
    id: 'healthy_leaf',
    title: 'Healthy Foliage',
    subtitle: 'Solanum lycopersicum',
    imageUrl: healthyLeafImg,
    pathogenType: 'None',
    severity: 'Healthy',
    description: 'Lush green leaflet with distinct venation, glandular trichomes, and zero pathogen necrosis.',
  },
];
