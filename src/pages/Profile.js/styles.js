import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
} from "mdb-react-ui-kit";
import styled from "styled-components";

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(to bottom, #f8f8f8, #d3d3d3);
`;

export const WrapperProfileUser = styled.div`
  width: 100%;
  background: linear-gradient(to bottom, #f8f8f8, #d3d3d3);
`;

export const WrapperProfileTitle = styled.h1`
  color: black;
  font-size: 20px;
  font-weight: 600;
  margin: 16px 0;
`;

export const StyledMDBCardImage = styled(MDBCardImage)`
  border-radius: 50%;
  min-width: 150px;
  min-height: 150px;
  max-width: 150px;
  max-height: 150px;
  object-fit: cover;
`;

export const CardBody = styled(MDBCardBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FlexCenterCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
`;

export const FlexCenterCenterCol = styled(MDBCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
`;

export const InPut = styled.input`
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 4px;
`;

export const CardBodys = styled(CardBody)`
  text-align: center;
`;

export const WrapperAvtUpload = styled(MDBCardText)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  width: 100%;
`;

export const WrapperAvatarFiles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 30vh;

  .Wrap-left {
    flex: 0.25;
  }

  .Wrap-right {
    flex: 0.75;
    text-align: center;
  }
  
`;
