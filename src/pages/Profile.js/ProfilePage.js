import React, { useEffect, useState } from "react";
import "./styles";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import * as UserServices from "../../services/UserServices";
import { useMutationHooks } from "./../../hooks/useMutationHook";

import Loading from "../../components/LoadingComponent/Loading";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlides";
import {
  CardBodys,
  FlexCenterCenter,
  FlexCenterCenterCol,
  InPut,
  StyledMDBCardImage,
  WrapperAvatarFiles,
  WrapperContent,
  WrapperProfileTitle,
  WrapperProfileUser,
} from "./styles";

import userImage from "../../assets/DefaultUser.jpg";
import { useNavigate } from "react-router-dom";
import { Upload } from "antd";
import { getBase64 } from "../../ultils";

const ProfilePage = () => {
  // 1: Variables
  const userRedux = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();
  const dishpatch = useDispatch();

  // 2: Mutation
  const mutation = useMutationHooks((Res) => {
    const { id, access_token, data } = Res;
    return UserServices.updateUser({ id, data, access_token });
  });
  const { isPending, isSuccess, data } = mutation;

  // 3: useEffect
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === "OK") {
        toast.success(data?.message);
        handleGetDetailsUser(userRedux?.id, userRedux?.access_token);
      } else if (data?.status === "ERROR") {
        toast.error(data?.message);
      }
    }
  }, [isSuccess]);

  // CLICK BUTTON BTN UPDATE -> CALL API HANDLE UPDATE USER - CLICK CẬP NHẬT
  const handleClickBtnUpdate = () => {
    const data = { name, email, phone, address, avatar };
    // call api -> trả về toàn bộ trạng thái của lệnh call đó. (truyền vào 1 object data)
    mutation.mutate({
      id: userRedux?.id,
      data,
      access_token: userRedux?.access_token,
    });
  };

  // USER INFOMATIONS AFTER UPDATE
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetailsUser(id, token);
    dishpatch(updateUser({ ...res?.data, access_token: token }));
  };

  // get value redux after userRedux change
  useEffect(() => {
    setName(userRedux?.name);
    setEmail(userRedux?.email);
    setPhone(userRedux?.phone);
    setAddress(userRedux?.address);
    setAvatar(userRedux?.avatar);
  }, [userRedux]);

  const handleChangeName = (value) => {
    setName(value);
  };
  const handleChangeEmail = (value) => {
    setEmail(value);
  };
  const handleChangePhone = (value) => {
    setPhone(value);
  };
  const handleChangeAddress = (value) => {
    setAddress(value);
  };

  // Tuy nhiên, cần lưu ý rằng event trong trường hợp này sẽ là một đối tượng chứa thông tin về tệp tải lên,
  // Ant Design cung cấp một đối tượng info trong onChange, chứa thông tin chi tiết về tệp và quá trình tải lên.
  const handleChangeAvatar = async (info) => {
    // C2: getBase64
    const file = info.fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  return (
    <div className="User-Profile Container flex-center-center">
      <div className="Wrapper Width">
        <WrapperProfileTitle>THÔNG TIN NGƯỜI DÙNG</WrapperProfileTitle>
        <Loading isPending={isPending}>
          <WrapperContent>
            <WrapperProfileUser>
              <MDBContainer>
                <MDBRow>
                  <MDBCol>
                    <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                      <MDBBreadcrumbItem>
                        <span onClick={() => navigate("/")}>Home</span>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem>
                        <span onClick={() => navigate("/")}>User</span>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol lg="4">
                    <FlexCenterCenterCol className="mb-4">
                      {/* avatar here */}
                      <CardBodys>
                        <StyledMDBCardImage
                          src={avatar || userImage}
                          alt="avatar"
                          fluid
                        />
                        <p className="text-muted mb-1">Full Stack Developer</p>
                        <p className="text-muted mb-4">
                          Bay Area, San Francisco, CA
                        </p>
                        <FlexCenterCenter>
                          <MDBBtn
                            onClick={(e) =>
                              handleClickBtnUpdate(e.target.value)
                            }
                          >
                            LƯU THÔNG TIN
                          </MDBBtn>
                        </FlexCenterCenter>
                      </CardBodys>
                    </FlexCenterCenterCol>
                  </MDBCol>
                  <MDBCol lg="8">
                    <MDBCard className="mb-4">
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Tên</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9" className="cursor-pointer">
                            <MDBCardText className="text-muted">
                              <InPut
                                type="text"
                                placeholder={name}
                                onChange={(e) =>
                                  handleChangeName(e.target.value)
                                }
                              />
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Email</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              <InPut
                                type="email"
                                placeholder={email}
                                onChange={(e) =>
                                  handleChangeEmail(e.target.value)
                                }
                              />
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>phone</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              <InPut
                                type="text"
                                placeholder={phone}
                                onChange={(e) =>
                                  handleChangePhone(e.target.value)
                                }
                              />
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Address</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              <InPut
                                type="text"
                                placeholder={
                                  address === " " ? address : "Địa chỉ của bạn"
                                }
                                onChange={(e) =>
                                  handleChangeAddress(e.target.value)
                                }
                              />
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />

                        <WrapperAvatarFiles>
                          <div className="Wrap-left">
                            <MDBCardText>Avatar</MDBCardText>
                          </div>
                          {/* setting image here */}
                          <div className="Wrap-right">
                            <Upload.Dragger
                              listType="picture"
                              showUploadList={{ showRemoveIcon: true }}
                              accept=".png, .jpg, .jpeg, .gif, .webp, .avif, .eps"
                              maxCount={1}
                              beforeUpload={(file) => {
                                return false;
                              }}
                              onChange={(event) => handleChangeAvatar(event)}
                            >
                              Drag files here or
                              <br />
                              <button>Click Upload</button>
                            </Upload.Dragger>
                          </div>
                        </WrapperAvatarFiles>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </WrapperProfileUser>
          </WrapperContent>
        </Loading>
      </div>
    </div>
  );
};

export default ProfilePage;
