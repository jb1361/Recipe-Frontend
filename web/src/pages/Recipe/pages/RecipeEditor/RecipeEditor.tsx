import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {useStandardEditor} from '../../../../components/util/form-components/EditorForm/hooks';
import {propertyOf} from '../../../../common/util/object';
import Input from '../../../../components/util/form-components/formik-inputs/Input/Input';
import {EditorForm} from '../../../../components/util/form-components/EditorForm/EditorForm';
import {RoutePaths} from '../../../../router/RoutePaths';
import {Recipe, recipeStore} from '../../../../common/redux/entities/recipe';
import {makeRecipe} from '../../../../common/util/factory';
import {CommonState} from '../../../../common/redux';

type Props = RouteComponentProps<{recipeId: string}> & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

function RecipeEditor(props: Props) {

  const standardEditor = useStandardEditor<Recipe>('Recipe', makeRecipe(), props,
    s => ({
      getEditUrl: () => RoutePaths.recipePaths.Edit.replace(':recipeId', String(props.match.params.recipeId)),
      getCancelUrl: () =>
        !s.isNew ?  RoutePaths.recipePaths.View.replace(':recipeId', props.match.params.recipeId) : RoutePaths.Recipe,
      onLoadForm: async () => props.recipes[Number(props.match.params.recipeId)],
      onNewForm: async () => makeRecipe(),
      saveAndRedirect: async (form: Recipe) => {
        const savedRecipe: any = await props.actions.upsertRecipe(form);
        return RoutePaths.recipePaths.View.replace(':recipeId', savedRecipe.id);
      }
    }));
  const {editable} = standardEditor;
  return (
    <EditorForm standardEditor={standardEditor}>{() => (
      <Form.Group as={Row}>
        <Form.Label column={true} sm={2}>Name</Form.Label>
        <Col sm={4}>
          <Input name={propertyOf<Recipe>('title')} disabled={!editable}/>
        </Col>
      </Form.Group>
    )}</EditorForm>
  );
}

const mapStateToProps = (state: CommonState) => ({recipes: recipeStore.selectors.getItems(state)});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({upsertRecipe: recipeStore.actions.upsert}, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditor);
