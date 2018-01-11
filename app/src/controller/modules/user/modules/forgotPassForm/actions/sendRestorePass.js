export default ({ state, forms, http, path }) => {
  if (forms.get('user.forgotPassForm').isValid) {
    state.set('user.forgotPassForm.isLoad', true);
    return http.post('/api/v1/user/password/restore', {
      email: state.get('user.forgotPassForm.email.value'),
    })
      .then(() => {
        state.set('user.forgotPassForm.isLoad', false);
        if (path && path.true) {
          return path.true();
        }
        return {};
      })
      .catch((error) => {
        state.set('user.forgotPassForm.isLoad', false);
        if (path && path.false) {
          return path.false({ error });
        }
        return { error };
      });
  }
  if (path && path.false) {
    return path.false({ error: 'Not Valid' });
  }
  return { error: 'Not Valid' };
};
