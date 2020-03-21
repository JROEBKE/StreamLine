import * as React from "react";
import { Switch, Route, BrowserRouter} from "react-router-dom"
import { Menu, Input, Container, Segment} from "semantic-ui-react";
import {StationSearch} from "./station-search"

export const App: React.FunctionComponent = _ => {
  return (<>
    <Segment>
      <Container fluid className="">
        <Menu>
            <Menu.Item
              name='home'
            />
            <Menu.Item
              name='messages'
            />
            <Menu.Item
              name='friends'
            />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
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
