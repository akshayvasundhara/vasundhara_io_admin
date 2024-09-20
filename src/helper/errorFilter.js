function ErrorFilter(errors, fields) {
  const filterData = Object.fromEntries(
    Object.entries(errors).filter(([key]) => fields.includes(key))
  );

  const sortedObj = Object.fromEntries(
    fields
      .filter(key => filterData?.hasOwnProperty(key))
      .map(key => [key, filterData[key]])
  );

  return sortedObj;
}

export default ErrorFilter;
