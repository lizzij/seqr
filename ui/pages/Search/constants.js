import { RadioGroup } from 'shared/components/form/Inputs'
import { snakecaseToTitlecase } from 'shared/utils/stringUtils'
import {
  VEP_GROUP_NONSENSE,
  VEP_GROUP_ESSENTIAL_SPLICE_SITE,
  VEP_GROUP_EXTENDED_SPLICE_SITE,
  VEP_GROUP_MISSENSE,
  VEP_GROUP_FRAMESHIFT,
  VEP_GROUP_INFRAME,
  VEP_GROUP_SYNONYMOUS,
  GROUPED_VEP_CONSEQUENCES,
} from 'shared/utils/constants'

export const CLINVAR_GROUP = 'clinvar'
const CLIVAR_PATH = 'pathogenic'
const CLINVAR_LIKELY_PATH = 'likely_pathogenic'
const CLINVAR_OPTIONS = [
  {
    text: 'Pathogenic (P)',
    value: CLIVAR_PATH,
  },
  {
    text: 'Likely Pathogenic (LP)',
    value: CLINVAR_LIKELY_PATH,
  },
  {
    description: 'Clinvar variant of uncertain significance or variant with conflicting interpretations',
    text: 'VUS or Conflicting',
    value: 'vus_or_conflicting',
  },
  {
    text: 'Likely Benign (LB)',
    value: 'likely_benign',
  },
  {
    text: 'Benign (B)',
    value: 'benign',
  },
]

export const HGMD_GROUP = 'hgmd'
const HGMD_OPTIONS = [ // see https://portal.biobase-international.com/hgmd/pro/global.php#cats
  {
    description: 'Pathological mutation reported to be disease causing in the corresponding report (i.e. all other HGMD data).',
    text: 'Disease Causing (DM)',
    value: 'disease_causing',
  },
  {
    description: 'Likely pathological mutation reported to be disease causing in the corresponding report, but where the author has indicated that there may be some degree of doubt, or subsequent evidence has come to light in the literature, calling the deleterious nature of the variant into question.',
    text: 'Likely Disease Causing (DM?)',
    value: 'likely_disease_causing',
  },
  {
    description: 'All other classifications present in HGMD (including: Disease-associated polymorphism (DP), Disease-associated polymorphism with additional supporting functional evidence (DFP), In vitro/laboratory or in vivo functional polymorphism (FP), Frameshift or truncating variant (FTV)',
    text: 'Other (DP, DFP, FP, FTV)',
    value: 'hgmd_other',
  },
]

const GROUP_LABELS = { [VEP_GROUP_INFRAME]: 'In Frame', [CLINVAR_GROUP]: 'In Clinvar', [HGMD_GROUP]: 'In HGMD' }

export const ANNOTATION_GROUPS = Object.entries({
  [CLINVAR_GROUP]: CLINVAR_OPTIONS,
  [HGMD_GROUP]: HGMD_OPTIONS,
  ...GROUPED_VEP_CONSEQUENCES,
}).map(([name, options]) => ({
  name, options, groupLabel: GROUP_LABELS[name] || snakecaseToTitlecase(name),
}))

export const ANNOTATION_FILTER_OPTIONS = [
  {
    text: 'High Impact',
    vepGroups: [
      VEP_GROUP_NONSENSE,
      VEP_GROUP_ESSENTIAL_SPLICE_SITE,
      VEP_GROUP_FRAMESHIFT,
    ],
  },
  {
    text: 'Moderate to High Impact',
    vepGroups: [
      VEP_GROUP_NONSENSE,
      VEP_GROUP_ESSENTIAL_SPLICE_SITE,
      VEP_GROUP_FRAMESHIFT,
      VEP_GROUP_MISSENSE,
      VEP_GROUP_INFRAME,
    ],
  },
  {
    text: 'All rare coding variants',
    vepGroups: [
      VEP_GROUP_NONSENSE,
      VEP_GROUP_ESSENTIAL_SPLICE_SITE,
      VEP_GROUP_FRAMESHIFT,
      VEP_GROUP_MISSENSE,
      VEP_GROUP_INFRAME,
      VEP_GROUP_SYNONYMOUS,
      VEP_GROUP_EXTENDED_SPLICE_SITE,
    ],
  },
].map(({ vepGroups, ...option }) => ({
  ...option,
  value: {
    [CLINVAR_GROUP]: [CLIVAR_PATH, CLINVAR_LIKELY_PATH],
    ...vepGroups.reduce((acc, group) => (
      { ...acc, [group]: GROUPED_VEP_CONSEQUENCES[group].map(({ value }) => value) }
    ), {}),
  },
}))


export const FREQUENCIES = [
  {
    name: '1kg_wgs_phase3',
    label: '1000 Genomes v3',
    homHemi: false,
    labelHelp: 'Filter by allele count (AC) in the 1000 Genomes Phase 3 release (5/2/2013), or by allele frequency (popmax AF) in any one of these five subpopulations defined for 1000 Genomes Phase 3: AFR, AMR, EAS, EUR, SAS',
  },
  {
    name: 'exac_v3',
    label: 'ExAC v0.3',
    homHemi: true,
    labelHelp: 'Filter by allele count (AC) or homozygous/hemizygous count (H/H) in ExAC, or by allele frequency (popmax AF) in any one of these six subpopulations defined for ExAC: AFR, AMR, EAS, FIN, NFE, SAS',
  },
  {
    name: 'gnomad-genomes2',
    label: 'gnomAD 15k genomes',
    homHemi: true,
    labelHelp: 'Filter by allele count (AC) or homozygous/hemizygous count (H/H) among gnomAD genomes, or by allele frequency (popmax AF) in any one of these six subpopulations defined for gnomAD genomes: AFR, AMR, EAS, FIN, NFE, ASJ',
  },
  {
    name: 'gnomad-exomes2',
    label: 'gnomAD 123k exomes',
    homHemi: true,
    labelHelp: 'Filter by allele count (AC) or homozygous/hemizygous count (H/H) among gnomAD exomes, or by allele frequency (popmax AF) in any one of these seven subpopulations defined for gnomAD genomes: AFR, AMR, EAS, FIN, NFE, ASJ, SAS',
  },
  {
    name: 'topmed',
    label: 'TOPMed',
    homHemi: false,
    labelHelp: 'Filter by allele count (AC) or allele frequency (AF) in TOPMed',
  },
  {
    name: 'AF',
    label: 'This Callset',
    homHemi: false,
    labelHelp: 'Filter by allele count (AC) or by allele frequency (AF) among the samples in this family plus the rest of the samples that were joint-called as part of variant calling for this project.',
  },
]

export const QUALITY_FILTER_FIELDS = [
  {
    name: 'vcf_filter',
    label: 'Filter Value',
    labelHelp: 'Either show only variants that PASSed variant quality filters applied when the dataset was processed (typically VQSR or Hard Filters), or show all variants',
    control: RadioGroup,
    options: [{ value: '', text: 'Show All Variants' }, { value: 'pass', text: 'Pass Variants Only' }],
    margin: '1em 2em',
    widths: 'equal',
  },
  {
    name: 'min_gq',
    label: 'Genotype Quality',
    labelHelp: 'Genotype Quality (GQ) is a statistical measure of confidence in the genotype call (eg. hom. or het) based on the read data',
    min: 0,
    max: 100,
  },
  {
    name: 'min_ab',
    label: 'Allele Balance',
    labelHelp: 'The allele balance represents the percentage of reads that support the alt allele out of the total number of sequencing reads overlapping a variant. Use this filter to set a minimum percentage for the allele balance in heterozygous individuals.',
    min: 0,
    max: 50,
  },
]

export const QUALITY_FILTER_OPTIONS = [
  {
    text: 'High Quality',
    value: {
      vcf_filter: 'pass',
      min_gq: 20,
      min_ab: 25,
    },
  },
  {
    text: 'All Passing Variants',
    value: {
      vcf_filter: 'pass',
      min_gq: 0,
      min_ab: 0,
    },
  },
  {
    text: 'All Variants',
    value: {
      vcf_filter: '',
      min_gq: 0,
      min_ab: 0,
    },
  },
]