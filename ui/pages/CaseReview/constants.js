/* eslint-disable no-multi-spaces */
import {
  CASE_REVIEW_STATUS_ACCEPTED,
  CASE_REVIEW_STATUS_IN_REVIEW,
  CASE_REVIEW_STATUS_UNCERTAIN,
  CASE_REVIEW_STATUS_NOT_ACCEPTED,
  CASE_REVIEW_STATUS_MORE_INFO_NEEDED,

  CASE_REVIEW_STATUS_ACCEPTED_FOR_STORE_DNA,
  CASE_REVIEW_STATUS_ACCEPTED_FOR_ARRAY,
  CASE_REVIEW_STATUS_ACCEPTED_FOR_EXOME,
  CASE_REVIEW_STATUS_ACCEPTED_FOR_GENOME,
  CASE_REVIEW_STATUS_ACCEPTED_FOR_RNASEQ,
} from '../../shared/constants/caseReviewConstants'

export const SHOW_ALL = 'ALL'
export const SHOW_ACCEPTED = 'ACCEPTED'
export const SHOW_NOT_ACCEPTED = 'NOT_ACCEPTED'
export const SHOW_IN_REVIEW = 'IN_REVIEW'
export const SHOW_UNCERTAIN = 'UNCERTAIN'
export const SHOW_MORE_INFO_NEEDED = 'MORE_INFO_NEEDED'

export const SORT_BY_FAMILY_NAME = 'FAMILY_NAME'
export const SORT_BY_DATE_ADDED = 'DATE_ADDED'
export const SORT_BY_DATE_LAST_CHANGED = 'DATE_LAST_CHANGED'

export const CASE_REVIEW_STATUS_OPTIONS = [
  { value: CASE_REVIEW_STATUS_IN_REVIEW,                   name: 'In Review',             color: '#2196F3' },
  { value: CASE_REVIEW_STATUS_UNCERTAIN,                   name: 'Uncertain',             color: '#FDDD1A' },
  { value: CASE_REVIEW_STATUS_ACCEPTED,                    name: 'Accepted',              color: '#8BC34A' },
  { value: CASE_REVIEW_STATUS_NOT_ACCEPTED,                name: 'Not Accepted',          color: '#F44336' },  //#C5CAE9
  { value: CASE_REVIEW_STATUS_MORE_INFO_NEEDED,            name: 'More Info Needed',      color: '#4f5cb3' },  //#673AB7
]

export const CASE_REVIEW_STATUS_ACCEPTED_FOR_OPTIONS = [
  { value: CASE_REVIEW_STATUS_ACCEPTED_FOR_STORE_DNA,   name: 'Store DNA' },
  { value: CASE_REVIEW_STATUS_ACCEPTED_FOR_ARRAY,       name: 'Array' },
  '---', /* adds line break */
  { value: CASE_REVIEW_STATUS_ACCEPTED_FOR_EXOME,       name: 'WES' },
  { value: CASE_REVIEW_STATUS_ACCEPTED_FOR_GENOME,      name: 'WGS' },
  { value: CASE_REVIEW_STATUS_ACCEPTED_FOR_RNASEQ,      name: 'RNA' },
]
