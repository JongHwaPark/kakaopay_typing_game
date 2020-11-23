///kakaopay-fe/resources/words
export const getList = async (path = '/kakaopay-fe/resources/words') => {
  const response = await fetch(path);
  if ([200, 204].includes(response.status)) {
    return await response.json();
  } else{
    throw response
  }
};

