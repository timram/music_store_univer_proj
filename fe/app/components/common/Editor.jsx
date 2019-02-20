import React from 'react';
import { Formik } from 'formik';
import {
  compose,
  branch,
  withHandlers
} from 'recompose';
import PageLoader from '../loaders/page-loader';
import withValueLoading from '../../helpers/withValueLoading';
import withModal from '../../helpers/containers/withModal';
import ModalTypes from '../modals/modal-types';
import PropTypes from 'prop-types';

const enhancer = compose(
  withModal(),

  branch(
    ({ resID }) => {
      return typeof resID !== 'undefined';
    },
    compose(
      withValueLoading(({
        loadResource
      }) => ({
        name: 'resource',
        loaderComponent: PageLoader,
        useLoader: true,
        valueLoader: loadResource
      })),
      withHandlers(({
        deleteable,
        title,
        deleteResource
      }) => deleteable ? {
        onDelete: ({ resID, showModal }) => async () => {
          showModal(ModalTypes.DIALOG, {
            title: `Удалить ${title || ''} ?`,
            onApprove: () => deleteResource(resID) 
          });
        }
      } : {})
    )
  )
);

const Editor = ({
  initValues,
  resource,
  validationSchema,
  handleError,
  createResource,
  updateResource,
  setLoaded,
  setResource,
  title = '',
  onDelete,
  Component,
  showModal
}) =>
  <Formik
    initialValues={resource || initValues}
    validationSchema={validationSchema}
    onSubmit={async (formData, { setErrors }) => {
      try {
        const isUpdateResource = resource && resource.id;

        const { method, infoTitle } = isUpdateResource
          ? {
              method: updateResource.bind(null, resource.id),
              infoTitle: `${title} обновлен!`
            }
          : {
              method: createResource,
              infoTitle: `${title} создан!`
            };
        
        const newResource = await method(formData);

        if (isUpdateResource) {
          setLoaded(false);
          setTimeout(() => setResource(newResource), 100);
        }

        showModal(ModalTypes.INFO_MODAL, { title: infoTitle });
      } catch (err) {
        const errors = handleError && handleError(err);
        if (!errors) {
          throw err;
        }
        setErrors(errors);
      }
    }}

    validateOnBlur
    render={props => <Component {...props} onDelete={onDelete}/>}
  />

Editor.propTypes = {
  initValues: PropTypes.any.isRequired,
  validationSchema: PropTypes.object.isRequired,
  handleError: PropTypes.func,
  loadResource: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  updateResource: PropTypes.func.isRequired,
  deleteResource: PropTypes.func,
  title: PropTypes.string,
  deleteable: PropTypes.bool,
  Component: PropTypes.func.isRequired
}

export default enhancer(Editor);
