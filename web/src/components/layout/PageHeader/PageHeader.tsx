import React from 'react';
import styles from './PageHeader.module.scss';
import {Link} from 'react-router-dom';
import {RoutePaths} from '../../../router/RoutePaths';
import IconButton from '../../util/widgets/IconButton/IconButton';
import {AppTheme, getLogoLink} from '../../../appTheme';

interface PageHeaderProps {
  label: string;
  removeMargin?: boolean;
  children: any;
}

const HeaderLink = ({to, text}: {to: string; text: string}) =>
  (<Link style={{fontWeight: 'bold', margin: '0 .5rem'}} to={to}>{text}</Link>);

export function PageHeader(props: PageHeaderProps) {
  const marginStyle = props.removeMargin ? {} : {marginBottom: '1rem'};
  return (
    <div className={styles['page-body']} style={AppTheme.styles.offsetBackground}>
      <div className={styles['header']} style={{...AppTheme.styles.background, ...marginStyle }}>
        <Link to={RoutePaths.home}>
          <img src={getLogoLink()} alt='Uptime RMX' style={{height: '3rem' }} />
        </Link>
        <h4 style={{marginBottom: 0}}>{props.label}</h4>
        <HeaderLink to={RoutePaths.Recipe} text='Recipes'/>
        <IconButton styles={{marginLeft: '1rem'}} icon='sign-out-alt' link={RoutePaths.logout} size={'2x'} />
      </div>
      {props.children}
    </div>
  );

}
