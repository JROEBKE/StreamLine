import * as React from "react";
import { Header, Icon, Grid, Image, Segment, Placeholder, Card, Button, Progress, SemanticCOLORS } from "semantic-ui-react";
import { Map, TileLayer, ScaleControl, Marker} from "react-leaflet"
import Axios from "axios";
import { ITeststation } from "../entities/Teststation"
import dayjs from "dayjs"
import {bind} from "decko"

dayjs.locale("de")
type Success = "success"
type Failure = "failure"
type Ready = "ready"
type Loading = "loading"

type PageStateKey = Success | Failure | Ready | Loading


type PageStateFactory = {
  "success": () => ({state: "success"}),
  "failure": (err: string) => ({state: "failure", error: string}),
  "ready": () => ({state: "ready"}),
  "loading": () => ({state: "loading"}),
}

const PageStateFactory: PageStateFactory = {
  "success": () => ({state: "success"}),
  "failure": (err: string) => ({state: "failure", error: err}),
  "ready": () => ({state: "ready"}),
  "loading": () => ({state: "loading"}),
}

type PageState = ReturnType<PageStateFactory[PageStateKey]>


interface State {
  location?: [number, number] | undefined
  zoom?: number | undefined
  supportsGeolocation: any
  stationsPerDay?: {[date: string]: ITeststation[]} | undefined
  pageState: PageState
}

interface Props {}

export class StationSearch extends React.Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {
      location: undefined,
      zoom: undefined,
      supportsGeolocation: true,
      stationsPerDay: undefined,
      pageState: PageStateFactory.ready()
    }
  }
  componentDidMount() {
    if (!navigator.geolocation) {
      this.setState({
        supportsGeolocation: false
      })
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => this.setState({location: [position.coords.latitude, position.coords.longitude], zoom: 10}),
        () => this.setState({supportsGeolocation: false})
      );
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const {zoom, location} = this.state
    if(
      location && zoom && zoom > 10 &&
      (
        (zoom && prevState.zoom !== zoom)
        || (location !== prevState.location)
      )
    ) {
      this.setState({pageState: PageStateFactory.loading()})
      Axios.get(`/api/stations/nearByAndSpare/${location[0]}/${location[1]}}`).then(response => {
        this.setState({
          stationsPerDay: response.data,
          pageState: PageStateFactory.success()
        })
      }).catch(err => PageStateFactory.failure(err))
    }
  }

  private computeDayString(date: dayjs.Dayjs): string {
    switch(date.day()) {
      case(dayjs().day()): return "Heute";
      case(dayjs().add(1, 'day').day()): return "Morgen";
      default: return [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
      ][date.day()]
    }
  }

  private renderTable() {
    switch(this.state.pageState.state) {
      case "loading": return <Segment loading>
            <Placeholder style={{ height: 50, width: "100%"}}>
              <Placeholder.Image />
            </Placeholder>
)        </Segment>
      case "ready":
      case "success": return <Segment>
        {
          Object.keys(this.state.stationsPerDay || {}).length == 0
            ? "Klicke auf der Karte auf deine Stadt"
            : Object
                .entries(this.state.stationsPerDay || {})
                .map(i => this.renderDateAvailability(i))
        }
      </Segment>
      case "failure": <Segment>
        Etwas ist beim verarbeiten deiner Anfrage schief gelaufen. :(
      </Segment>

    }
  }

  private computeProgressColor(appointments: number, capacity: number): SemanticCOLORS {
    if(appointments/capacity < 0.5) {
      return "green"
    } else if(appointments/capacity < 0.9) {
      return "orange"
    } else {
      return "red"
    }
  }

  @bind
  private renderStationCapacity(s: ITeststation): React.ReactNode {
    return (
      <Card>
      <Card.Content>
        <Card.Header>{s.label}</Card.Header>
        <Card.Meta>{s.street} {s.houseNumber}, {s.postCode} {s.city} </Card.Meta>
        <Card.Description>
          <Progress
            value={(s as any).appointments}
            total={s.capacity}
            color={this.computeProgressColor((s as any).appointments, s.capacity)}
          >
            {(s as any).appointments} / {s.capacity}
          </Progress>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button>
          Termin auswaehlen
        </Button>
      </Card.Content>
    </Card>
    )
  }

  private renderDateAvailability(entry: [string, ITeststation[]] | undefined): React.ReactNode{
    if(entry) {
      const [dateString, stations] = entry
      const date = dayjs(dateString)
      return (
        <>
        <Header as="">
          {this.computeDayString(date)}, {date.format("DD.MM.YYYY")}
        </Header>
        <Segment basic>
          {stations.length > 0
            ? stations.map(this.renderStationCapacity)
            : "Heute sind keine Kapazitaeten mehr frei"
          }
        </Segment>
        </>
      )
    }
  }

  render() {
    const availableStations = Object.entries(this.state.stationsPerDay || {})
                         .filter((i:[string, ITeststation[]]) => i[1].length > 0)
                         .map((i: [string, ITeststation[]]) => {
                           return i[1]
                         })
                        .reduce((acc: ITeststation[], val: ITeststation[]) => {
                           return [
                             ...acc,
                             ...val
                           ]
                         },[] as ITeststation[])
                                    .reduce((acc, val) => {
                                      console.log(val)
                                      return {
                                        ...acc,
                                        ...{[val.id]: val}
                                      }
                                    }, {} as {[id: string]: ITeststation})

    return (<>
        <Header as='h2'>
          <Header.Content>
            Available test locations
          </Header.Content>
        </Header>
        <Grid columns='1'>
          <Grid.Row>
            <Grid.Column>
              <div style={{height: "500px", width: "100%"}}>
                <Map style={{height: "100%"}}
                     onclick={ e =>
                       this.setState({
                         location: [e.latlng.lat, e.latlng.lng],
                         zoom: 11
                       })
                     }
                     onViewportChanged={p => this.setState({
                       location: p.center || undefined,
                       zoom: p.zoom || undefined
                     })}
                     center={this.state.location || [50, 10]} zoom={this.state.zoom || 5}>
                  {Object.entries(availableStations)
                         .map((i) => {
                           return i[1]
                         })
                         .map(e => <Marker position={e.coordinates.coordinates}/>)}
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  />
                </Map>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {this.renderTable()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}
