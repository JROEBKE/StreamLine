import * as React from "react";
import { Switch, Route, BrowserRouter} from "react-router-dom"
import { Menu, Input, Container, Segment} from "semantic-ui-react";
import {StationSearch} from "./station-search"

export const App: React.FunctionComponent = _ => {
  return (<>
    <Segment basic>
      <Container fluid className="">
        <Menu inverted color="teal">
          <Menu.Menu position='right'>
              <Menu.Item
                name='logout'
              />
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
      <Container>
        <BrowserRouter>
          <Switch>
            <Route render={props => <StationSearch />} />
          </Switch>
        </BrowserRouter>
      </Container>
    </>
  )
}
