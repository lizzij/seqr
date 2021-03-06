import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import BaseLayout from 'shared/components/page/BaseLayout'
import GeneDetail from 'shared/components/panel/genes/GeneDetail'
import Dashboard from 'pages/Dashboard/Dashboard'
import Project from 'pages/Project/Project'
import VariantSearch from 'pages/Search/VariantSearch'
import GeneInfoSearch from 'pages/GeneInfoSearch'
import LocusLists from 'pages/LocusLists'
import Staff from 'pages/Staff/Staff'
import SetPassword from 'pages/Login/components/SetPassword'
import rootReducer from 'redux/rootReducer'
import { configureStore } from 'redux/utils/configureStore'

import 'semantic-ui-css/semantic-custom.css'
import 'shared/global.css'


ReactDOM.render(
  <Provider store={configureStore(rootReducer, window.initialJSON)}>
    <AppContainer>
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/project/:projectGuid" component={Project} />
            <Route path="/variant_search" component={VariantSearch} />
            <Route path="/gene_info/:geneId" component={({ match }) => <GeneDetail geneId={match.params.geneId} />} />
            <Route path="/gene_info" component={GeneInfoSearch} />
            <Route path="/gene_lists" component={LocusLists} />
            <Route path="/staff" component={Staff} />
            <Route path="/users/set_password" component={SetPassword} />
            <Route component={() => <div>Invalid URL</div>} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    </AppContainer>
  </Provider>,
  document.getElementById('reactjs-root'),
)
