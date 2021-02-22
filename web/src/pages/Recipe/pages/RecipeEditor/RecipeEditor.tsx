import React, {useMemo, useState} from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {useStandardEditor} from '../../../../components/util/form-components/EditorForm/hooks';
import {propertyOf} from '../../../../common/util/object';
import Input from '../../../../components/util/form-components/formik-inputs/Input/Input';
import {EditorForm} from '../../../../components/util/form-components/EditorForm/EditorForm';
import {RoutePaths} from '../../../../router/RoutePaths';
import {Ingredient, Recipe, recipeStore} from '../../../../common/redux/entities/recipe';
import {makeRecipe} from '../../../../common/util/factory';
import {CommonState} from '../../../../common/redux';
import IconButton from '../../../../components/util/widgets/IconButton/IconButton';
import {Redirect} from 'react-router-dom';
import {InputRow} from '../../../../components/util/form-components/InputRow';
import {ExpandableTextBoxInput} from '../../../../components/util/ExpandableTextBox/ExpandableTextBox';
import {ListTable} from '../../../../components/util/lists/ListTable/ListTable';
import {ListRow} from '../../../../components/util/lists/ListRow/ListRow';
import IngredientList from '../../components/IngredientList/IngredientList';
import InstructionList from '../../components/InstructionList/InstructionList';

type Props = RouteComponentProps<{recipeId: string}> & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

function RecipeEditor(props: Props) {
  const [redirectUrl, setRedirectUrl] = useState('');
  const renderRedirect = () => redirectUrl ? <Redirect to={redirectUrl}/> : null;
  const getFieldName = (name: keyof Recipe) => name;
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
    <>
      {renderRedirect()}
      <IconButton
        onClick={() => setRedirectUrl(RoutePaths.Recipe)}
        icon={'arrow-left'}
        customSize={20}
        styles={{marginBottom: '1rem'}}
        iconToolTipText={'Back To Recipes'}
      />
      <EditorForm standardEditor={standardEditor}>{({values}) => (
        <>
          <InputRow label='Author'>
            <Input name={getFieldName('author')} disabled={!editable}/>
          </InputRow>
          <InputRow label='Title'>
            <Input name={getFieldName('title')} disabled={!editable}/>
          </InputRow>
          <InputRow label='Comment'>
            <ExpandableTextBoxInput name={getFieldName('comment')} editable={editable} rows={3}/>
          </InputRow>
          <IngredientList ingredients={values.ingredients} editable={editable} prefix={getFieldName('ingredients')}/>
          <InstructionList instructions={values.instructions} editable={editable} prefix={getFieldName('instructions')}/>
        </>
      )}</EditorForm>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({upsertRecipe: recipeStore.actions.upsert}, dispatch)});
const mapStateToProps = (state: CommonState) => ({recipes: recipeStore.selectors.getItems(state)});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditor);
