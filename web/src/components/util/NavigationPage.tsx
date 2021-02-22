import {Component} from 'react';
import {RouteComponentProps} from 'react-router';

export abstract class NavigationPage<P extends RouteComponentProps<any>, S> extends Component<P, S> {

  async componentDidMount() {
    await this.handleNavigation();
  }

  async componentDidUpdate(prevProps: P) {
    if (prevProps.location.key !== this.props.location.key) {
      await this.handleNavigation();
    }
  }

  abstract async handleNavigation(): Promise<void>;
}
