import Image from "next/image";
import {
  RequiredLabel,
  Label,
  Select,
  TextArea,
  Input,
  PlaceholderOption,
  InputContainer,
  TextAreaLabel,
  InputDate,
  Title,
  Container,
  RegisterButton,
  CancelButton,
  Bar,
  ButtonContainer,
  FileInput,
} from "@/components/register/styled";
import React, { FormEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Info from "@/components/register/Info";
import { multipartClient } from "@/api/httpClient";
import { useRouter } from "next/router";
import { fetchItem } from "@/api/items/fetchItem";

// enum CategoryEnum {
//   option1 = "option1",
//   option2 = "option2",
//   option3 = "option3",
// }

// enum StatusEnum {
//   option1 = "option1",
//   option2 = "option2",
//   option3 = "option3",
// }

interface Inputs {
  name: string;
  description: string;
  categoryName: string;
  area: string;
  lostPlace: string;
  takePlace: string;
  // status: StatusEnum;
  getDate: string;
  image: FileList;
}

const UpdateAcquired = () => {
  const router = useRouter();
  const { id } = router.query;
  const [preview, setPreview] = useState<string>();
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  const image = watch("image");
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    multipartClient
      .patch(`/api/items/${id}`, { ...data, image: data.image[0] })
      .then((res) => {
        alert("게시글이 수정되었습니다.");
        router.push("/found");
      })
      .catch((err) => {
        alert("게시글 수정에 실패하였습니다.");
        router.push("/");
      });

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetchItem({ itemId: Number(id) })
      .then((res) => {
        setValue("name", res.name);
        setValue("getDate", res.getDate);
        setValue("description", res.description || "");
        setValue("categoryName", res.categoryName || "");
        setValue("lostPlace", res.lostPlace || "");
        setValue("takePlace", res.takePlace);
      })
      .catch((err) => {
        alert("등록되지 않은 게시글입니다.");
        router.push("/");
      });
  }, []);

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [image]);

  return (
    <Container>
      <Title>습득물 등록</Title>
      <Info>
        언제, 어디서, 어떤 물건을 습득하여, 어디에 맡겼는지 적어주세요. 습득물이
        주인을 찾으면 소정의 리워드를 증정해 드립니다.
      </Info>
      <Bar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <RequiredLabel htmlFor="title">제목</RequiredLabel>
          <Input id="name" type="text" {...register("name")} required />
        </InputContainer>
        <InputContainer>
          <RequiredLabel htmlFor="category">카테고리</RequiredLabel>
          {mounted && (
            <Select id="category" {...register("categoryName")} required>
              <PlaceholderOption disabled selected>
                카테고리 선택
              </PlaceholderOption>
              <option value="핸드폰">핸드폰</option>
              <option value="가방">가방</option>
              <option value="지갑">지갑</option>
              <option value="옷">옷</option>
              <option value="쇼핑백">쇼핑백</option>
              <option value="서류봉투">서류봉투</option>
              <option value="책">책</option>
              <option value="장난감">장난감</option>
              <option value="파일">파일</option>
              <option value="기타">기타</option>
            </Select>
          )}
        </InputContainer>
        <InputContainer>
          <RequiredLabel htmlFor="area">지역구</RequiredLabel>
          <InputDate id="area" type="text" {...register("area")} />
        </InputContainer>
        <InputContainer>
          <RequiredLabel htmlFor="getDate">습득일</RequiredLabel>
          <InputDate id="getDate" type="Date" {...register("getDate")} />
        </InputContainer>
        <InputContainer>
          <RequiredLabel htmlFor="lostPlace">습득장소</RequiredLabel>
          <Input id="lostPlacen" type="text" {...register("lostPlace")} />
        </InputContainer>
        <InputContainer>
          <RequiredLabel htmlFor="takePlace">보관장소</RequiredLabel>
          <Input id="takePlace" type="text" {...register("takePlace")} />
        </InputContainer>
        {/* <InputContainer>
          <RequiredLabel htmlFor="status">처리상태 선택</RequiredLabel>
          {mounted && (
            <Select id="status" {...register("status")}>
              <PlaceholderOption disabled selected>
                처리상태 선택
              </PlaceholderOption>
              <option value="1">옵션1</option>
              <option value="2">옵션2</option>
              <option value="3">옵션3</option>
            </Select>
          )}
        </InputContainer> */}
        <InputContainer>
          <TextAreaLabel htmlFor="description">상세설명</TextAreaLabel>
          <TextArea id="description" {...register("description")} />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="image">사진첨부</Label>
          {preview ? (
            <>
              <Image width={200} height={120} src={preview} alt="test" />
              <CancelButton
                onClick={(e) => {
                  e.preventDefault();
                  setPreview("");
                }}
              >
                취소
              </CancelButton>
            </>
          ) : (
            <FileInput id="image" type="file" {...register("image")} />
          )}
        </InputContainer>
        <Bar />
        <ButtonContainer>
          <CancelButton
            onClick={() => {
              if (confirm("작성을 취소하시겠습니까?")) {
                router.push("/found");
              }
            }}
          >
            취소
          </CancelButton>
          <RegisterButton type="submit">등록</RegisterButton>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default UpdateAcquired;
