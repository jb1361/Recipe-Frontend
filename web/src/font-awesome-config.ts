import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faPlusCircle,
  faSearch,
  faCaretDown,
  faCaretRight,
  faEye,
  faTrashAlt,
  faEdit,
  faLongArrowAltLeft,
  faArrowLeft,
  faChevronLeft,
  faSignOutAlt,
  faFileUpload,
  faCheck,
  faBars,
  faMinusSquare,
  faTimesCircle,
  faCopy,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faSpinner, faUserPlus, faUserCog, faArchive, faUserMinus, faUsers, faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export function configureFontAwesome(): void {
  library.add(
    faPlusCircle,
    faSearch,
    faCaretDown,
    faCaretRight,
    faEye,
    faTrashAlt,
    faEdit,
    faLongArrowAltLeft,
    faArrowLeft,
    faChevronLeft,
    faSignOutAlt,
    faFileUpload,
    faCheck,
    faBars,
    faMinusSquare,
    faTimesCircle,
    faCopy,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faSpinner,
    faUserPlus,
    faUserMinus,
    faUserCog,
    faArchive,
    faUsers,
    faArrowRight
  );
}
