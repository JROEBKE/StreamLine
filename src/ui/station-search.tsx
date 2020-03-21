import * as React from "react";
import { Header, Icon, Grid, Image } from "semantic-ui-react";

export const StationSearch: React.FunctionComponent = _ => {
  return (<>
  <Header as='h2'>
    <Header.Content>
      Available test locations
    </Header.Content>
  </Header>
  <Grid columns='2' divided>
    <Grid.Row>
      <Grid.Column>
        Me is table
      </Grid.Column>
      <Grid.Column>
        Me is map
      </Grid.Column>
    </Grid.Row>
  </Grid>
    </>
  )
}
