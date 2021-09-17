import React, { useContext, useState, useEffect } from 'react';
import Context from '../contexts/Context';
import Table from '../components/Table';

export default function Home() {
  const { data, setFilter, filters } = useContext(Context);
  const [column, setColumn] = useState();
  const [comparison, setComparison] = useState();
  const [value, setValue] = useState(0);
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    if (column === undefined) {
      setColumn('population');
    }

    if (comparison === undefined) {
      setComparison('maior que');
    }
  }, [column, comparison]);
  const handleChange = ({ target }) => {
    setFilter({ ...filters, nameFilter: target.value.toLowerCase() });
  };

  const handleClick = () => {
    if (!filters.numbersFilter.some((filter) => filter.columnFilter === column)) {
      setFilter({
        ...filters,
        numbersFilter: [
          ...filters.numbersFilter,
          {
            columnFilter: column,
            comparisonFilter: comparison,
            valueFilter: value,
          }],
      });
      setColumnOptions(columnOptions.filter((option) => option !== column));
    }
  };

  return (
    <>
      <input
        type="text"
        onChange={ handleChange }
        data-testid="name-filter"
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {columnOptions.map((option, index) => (
          <option key={ index } value={ option }>{ option }</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        onChange={ ({ target }) => setValue(Number(target.value)) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Filter
      </button>
      {data ? <Table data={ data } /> : <p>nao me carregaram aqui</p>}
    </>
  );
}
