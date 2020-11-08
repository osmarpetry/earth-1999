import React, { FC } from 'react';

interface PlaceholderProps {
  status: 'loading' | 'success' | 'error';
  isEmpty: boolean;
  contentsName?: string | React.ReactElement;
  children: React.ReactElement;
}


const Placeholder: FC<PlaceholderProps> = ({
  status,
  isEmpty,
  children,
  contentsName,
}) => {
  const renderState = (
    state: 'error' | 'empty',
    title: React.ReactElement,
    message: React.ReactElement
  ) => {
    if (state === 'empty') {
      return <h1>Vazio</h1>;
    }
    return <h1>Erro</h1>
  };

  if (status === 'error') {
    return renderState('error', <h1>Erro</h1>, <p>Tenta na próxima</p>)
  }

  if (isEmpty && status === 'success') {
    return renderState('empty', <h1>Vazio</h1>, <p>Tenta na próxima</p>)

  }

  return children;
};

export default Placeholder;
