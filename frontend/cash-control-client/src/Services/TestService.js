import {toast}    from 'react-toastify';
import {api}      from '../Config';
import {TEST_API} from '../Constants';

export const testAll = async () => {
  try {
    await toast.promise(api.get(TEST_API.TEST_PUBLIC), {
      pending: 'Wait a couple of seconds...',
      success: {
        render({data}) {
          return 'PUBLIC TEST: ' + data.data;
        },
      },
      error: {
        render({data}) {
          return 'PUBLIC TEST: ' + (data.response.status === 401 ?
              data.response.data.message :
              data.response.data);
        },
      },
    });
  } catch (error) {
    console.log('PUBLIC TEST:', error.response);
  }

  try {
    await toast.promise(api.get(TEST_API.TEST_USER),
        {
          pending: 'Wait a couple of seconds...',
          success: {
            render({data}) {
              return 'USER TEST: ' + data.data;
            },
          },
          error: {
            render({data}) {
              return 'USER TEST: ' + (data.response.status === 401 ?
                  data.response.data.message :
                  data.response.data);
            },
          },
        },
        {
          autoClose: true,
          duration: 10000,
          closeOnClick: true,
        },
    );
  } catch (error) {
    console.log('ERROR USER TEST:', error.response);
  }
};