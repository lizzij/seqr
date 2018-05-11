import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { getProjectDetailsIsLoading } from 'redux/rootReducer'
import ExportTableButton from 'shared/components/buttons/export-table/ExportTableButton'
import TableLoading from 'shared/components/table/TableLoading'
import TableHeaderRow from './header/TableHeaderRow'
import EmptyTableRow from './EmptyTableRow'
import FamilyRow from './FamilyRow'
import IndividualRow from './IndividualRow'
import PageSelector from './PageSelector'
import { getVisibleSortedFamiliesWithIndividuals } from '../../utils/selectors'

const FamilyTable = ({ visibleFamilies, loading, headerStatus, showSearchLinks, fields, showInternalFilters, editCaseReview, exportUrls }) =>
  <div>
    <div style={{ padding: '0px 65px 10px 0px' }}>
      <PageSelector />
      <div style={{ float: 'right' }}>
        <ExportTableButton urls={exportUrls} />
      </div>
    </div>
    <Table celled striped padded>
      <TableHeaderRow headerStatus={headerStatus} showInternalFilters={showInternalFilters} />
      <Table.Body>
        {loading ? <TableLoading /> : null}
        {
          !loading && visibleFamilies.length > 0 ?
            visibleFamilies.map(family =>
              <Table.Row key={family.familyGuid}>
                <Table.Cell>
                  {[
                    <FamilyRow key={family.familyGuid} family={family} showSearchLinks={showSearchLinks} fields={fields} />,
                    family.individuals.map(individual => (
                      <IndividualRow
                        key={individual.individualGuid}
                        family={family}
                        individual={individual}
                        editCaseReview={editCaseReview}
                      />),
                    ),
                  ]}
                </Table.Cell>
              </Table.Row>)
            : <EmptyTableRow />
        }
      </Table.Body>
      <Table.Footer><Table.Row><Table.HeaderCell /></Table.Row></Table.Footer>
    </Table>
  </div>


export { FamilyTable as FamilyTableComponent }

FamilyTable.propTypes = {
  visibleFamilies: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  headerStatus: PropTypes.object,
  showInternalFilters: PropTypes.bool,
  editCaseReview: PropTypes.bool,
  exportUrls: PropTypes.array,
  fields: PropTypes.array,
  showSearchLinks: PropTypes.bool,
}

const mapStateToProps = state => ({
  visibleFamilies: getVisibleSortedFamiliesWithIndividuals(state),
  loading: getProjectDetailsIsLoading(state),
})

export default connect(mapStateToProps)(FamilyTable)
