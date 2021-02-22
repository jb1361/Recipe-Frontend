import {NavigationPage} from './NavigationPage';
import {RouteComponentProps} from 'react-router';

export abstract class EditorPage<P  extends RouteComponentProps<any>, S> extends NavigationPage<P, S> {
  // formiks reset form function
  protected resetFormFn?: (nextState: any) => void;

  /**
   * Reset the form is the function is set.
   * @param form
   */
  public resetForm(form: any): void {
    if (this.resetFormFn) {
      this.resetFormFn(form);
    }
  }

  /**
   * This must be called in the render function inside the <Formik> tag.
   * @param resetFormFn
   */
  public setResetForm(resetFormFn: (nextState: any) => void): void {
    this.resetFormFn = resetFormFn;
  }

}
