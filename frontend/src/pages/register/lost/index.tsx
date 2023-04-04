import Info from "@/components/register/Info";
import Image from "next/image";
import {
  Bar,
  ButtonContainer,
  CancelButton,
  Container,
  FileInput,
  Input,
  InputContainer,
  InputDate,
  Label,
  PlaceholderOption,
  RegisterButton,
  RequiredLabel,
  Select,
  TextArea,
  TextAreaLabel,
  Title,
} from "@/components/register/styled";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { multipartClient } from "@/api/httpClient";

enum CategoryEnum {
  option1 = "option1",
  option2 = "option2",
  option3 = "option3",
}

interface Inputs {
  name: string;
  categoryName: CategoryEnum;
  lostDate: string;
  lostPlace: string;
  description: string;
  image: FileList;
}

const Lost = () => {
  const [preview, setPreview] = useState<string>();
  const { register, handleSubmit, watch, reset } = useForm<Inputs>({
    defaultValues: {
      lostDate: new Date().toISOString().slice(0, 10),
    },
  });
  const image = watch("image");

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    multipartClient
      .post("/api/boards", { ...data, image: data.image[0] })
      .then((res) => {
        alert("게시글이 등록되었습니다.");
        router.push("/lost");
      })
      .catch((err) => {
        alert("게시글 등록에 실패하였습니다.");
        router.push("/");
      });

  const [mounted, setMounted] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [image]);
  return (
    <Container>
      <Title>분실물 등록</Title>
      <Info>
        언제, 어디서, 어떤 물건을 분실하였는지 상세히 적어주세요. 분실물을 더
        빠르게 찾는 데에 도움이 될 수 있습니다.
      </Info>
      <Bar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <RequiredLabel htmlFor="name">제목</RequiredLabel>
          <Input id="name" type="text" {...register("name")} required />
        </InputContainer>
        <InputContainer>
          <RequiredLabel htmlFor="categoryName">카테고리</RequiredLabel>
          {mounted && (
            <Select id="categoryName" {...register("categoryName")} required>
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
          <RequiredLabel htmlFor="lostDate">분실일</RequiredLabel>
          <InputDate id="lostDate" type="date" {...register("lostDate")} />
        </InputContainer>
        <InputContainer>
          <RequiredLabel htmlFor="lostPlace">분실장소</RequiredLabel>
          <Input id="lostPlace" type="text" {...register("lostPlace")} />
        </InputContainer>
        <InputContainer>
          <TextAreaLabel htmlFor="description">상세설명</TextAreaLabel>
          <TextArea id="description" {...register("description")} />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="picture">사진첨부</Label>
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
            <FileInput id="picture" type="file" {...register("image")} />
          )}
        </InputContainer>
        <Bar />
        <ButtonContainer>
          <CancelButton
            onClick={(e) => {
              e.preventDefault();
              if (confirm("작성을 취소하시겠습니까?")) {
                router.push("/lost");
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

export default Lost;
