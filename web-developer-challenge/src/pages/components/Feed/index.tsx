import React, { useEffect, useState } from "react";

import { Row, Image } from "antd";
import { useMutation, useQueryClient } from "react-query";

import {
  CardContainer,
  Column,
  ParagraphData,
  TitleContainer,
  TextContainer,
  Sendby,
  CloseIcon,
  FeedTitle,
  CloseIconContainer,
  ImageContainer,
  ParagraphContainer,
  ImageStyle,
} from "./styles";

import { useFeed } from "../../../services/hooks/useFeed";
import { api } from "@/services/api";

export default function index() {
  const { data } = useFeed();
  const queryClient = useQueryClient();

  const deletePost = useMutation(
    async (id) => {
      const response = await api.delete(`/feeds/${id}`);
      return response.data.feed;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("feeds");
      },
    }
  );

  return (
    <>
      <Row>
        <TitleContainer xs={24} xl={24}>
          <FeedTitle level={4}>Feed</FeedTitle>
        </TitleContainer>
        <Column xs={24} xl={24}>
          {data.map((feed: any, i: number) => {
            return (
              <CardContainer key={i}>
                <CloseIconContainer>
                  <CloseIcon
                    size={20}
                    onClick={() => deletePost.mutate(feed.id)}
                  />
                </CloseIconContainer>
                <Row>
                  <ImageContainer xl={6} xs={6}>
                    <ImageStyle src={feed.image} preview={false} />
                  </ImageContainer>
                  <ParagraphContainer xl={16} xs={16}>
                    <ParagraphData>{feed.comment}</ParagraphData>
                    <Sendby>
                      Enviado por <br />{" "}
                      <TextContainer>{feed.name}</TextContainer>
                    </Sendby>
                  </ParagraphContainer>
                </Row>
              </CardContainer>
            );
          })}
        </Column>
      </Row>
    </>
  );
}
