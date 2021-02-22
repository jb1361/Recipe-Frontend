import {FieldArray} from 'formik';
import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {EditablePropsWithPrefix} from '../../../../types';
import {Ingredient} from '../../../../common/redux/entities/recipe';
import {ListTable} from '../../../../components/util/lists/ListTable/ListTable';
import IconButton from '../../../../components/util/widgets/IconButton/IconButton';
import {makeIngredient} from '../../../../common/util/factory';
import {DivListRow} from '../../../../components/util/lists/ListRow/ListRow';
import {RedErrorMessage} from '../../../../components/util/form-components/RedErrorMessage/RedErrorMessage';
import Input from '../../../../components/util/form-components/formik-inputs/Input/Input';
import {CommonState} from '../../../../common/redux';
import {connect} from 'react-redux';
import {InputRow} from '../../../../components/util/form-components/InputRow';

type Props = EditablePropsWithPrefix & ReturnType<typeof mapStateToProps> &{
  ingredients: Ingredient[];
};

function IngredientList({prefix, editable, ingredients}: Props) {
  const getFieldName = (i: number, name: keyof Ingredient) => `${prefix}.${i}.${name}`;
  return (
    <FieldArray
      name={prefix}
      render={helpers => (
        <ListTable
          noItemsLabel={'No Ingredients added'}
          items={ingredients}
          renderHeader={() => (
            <Form.Row style={{paddingTop: '2rem', marginBottom: '1rem'}}>
              <h4>Ingredients</h4>
              {editable && (
                <Col className='d-flex justify-content-end align-items-center mb-1'>
                  <Form.Label style={{marginRight: '1rem', marginBottom: 0}}>Add Ingredient</Form.Label>
                  <IconButton
                    icon='plus-circle'
                    size='2x'
                    onClick={() => helpers.push(makeIngredient())}
                    styles={{marginLeft: '5px'}}
                  />
                </Col>)}
            </Form.Row>
          )}
          renderItem={(item, index) => (
            <DivListRow key={index}>
              <RedErrorMessage name={getFieldName(index, 'name')} />
              <Row>
                <Col className='d-flex justify-content-end align-items-center'>
                  <IconButton
                    icon='trash-alt'
                    hideIcon={!editable}
                    size='1x'
                    styles={{color: editable ? 'red' : 'black'}}
                    onClick={() => editable ? helpers.remove(index) : null}
                  />
                </Col>
              </Row>
              <InputRow label='Measurement' columnSize={2}>
                <Input name={getFieldName(index, 'measurement')} disabled={!editable} />
              </InputRow>
              <InputRow label='Item' columnSize={2}>
                <Input name={getFieldName(index, 'name')} disabled={!editable} />
              </InputRow>
            </DivListRow>
          )}
        />
      )}
    />
  );
}

const mapStateToProps = (s: CommonState) => ({});
export default connect(mapStateToProps, () => ({}))(IngredientList);
