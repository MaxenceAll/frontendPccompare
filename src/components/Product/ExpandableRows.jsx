import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ItemTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const ItemPropertyContainer = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const ItemPropertyName = styled.span`
  font-weight: bold;
`;

const ItemPropertyValue = styled.span`
  margin-left: 0.5rem;
`;

const ExpandableRows = ({ data }) => {
    const keys = Object.keys(data);
  
    return (
      <div>
        {keys.map((key) => (
          <p key={key}>{data[key]}</p>
        ))}
      </div>
    );
  };
  

export default ExpandableRows;
