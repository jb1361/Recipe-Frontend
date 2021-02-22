import {FieldArray} from 'formik';
import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {EditablePropsWithPrefix} from '../../../../types';
import {Ingredient, Instruction} from '../../../../common/redux/entities/recipe';
import {ListTable} from '../../../../components/util/lists/ListTable/ListTable';
import IconButton from '../../../../components/util/widgets/IconButton/IconButton';
import {makeIngredient} from '../../../../common/util/factory';
import {DivListRow} from '../../../../components/util/lists/ListRow/ListRow';
import {RedErrorMessage} from '../../../../components/util/form-components/RedErrorMessage/RedErrorMessage';
import Input from '../../../../components/util/form-components/formik-inputs/Input/Input';
import {CommonState} from '../../../../common/redux';
import {connect} from 'react-redux';
import {InputRow} from '../../../../components/util/form-components/InputRow';
import {ExpandableTextBoxInput} from '../../../../components/util/ExpandableTextBox/ExpandableTextBox';
import {VerticalInput} from '../../../../components/util/form-components/InputColumn';

type Props = EditablePropsWithPrefix & ReturnType<typeof mapStateToProps> &{
  instructions: Instruction[];
};

function InstructionList({prefix, editable, instructions}: Props) {
  const getFieldName = (i: number, name: keyof Instruction) => `${prefix}.${i}.${name}`;
  return (
    <FieldArray
      name={prefix}
      render={helpers => (
        <ListTable
          noItemsLabel={'No Instructions added'}
          items={instructions}
          renderHeader={() => (
            <Form.Row style={{paddingTop: '2rem', marginBottom: '1rem'}}>
              <h4>Instructions</h4>
              {editable && (
                <Col className='d-flex justify-content-end align-items-center mb-1'>
                  <Form.Label style={{marginRight: '1rem', marginBottom: 0}}>Add Instructions</Form.Label>
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
              <RedErrorMessage name={getFieldName(index, 'text')} />
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
              <VerticalInput label='Instruction'>
                <ExpandableTextBoxInput name={getFieldName(index, 'text')} rows={3} editable={editable} />
              </VerticalInput>
            </DivListRow>
          )}
        />
      )}
    />
  );
}

const mapStateToProps = (s: CommonState) => ({});
export default connect(mapStateToProps, () => ({}))(InstructionList);
