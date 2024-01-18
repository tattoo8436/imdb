import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IActor } from "../../utils/type";
import { movieApi } from "../../apis/movieApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Col, Image, Row } from "antd";
import { BASE_URL_API } from "../../utils";
import dayjs from "dayjs";
import { StarFilled } from "@ant-design/icons";

const Actor = () => {
  const [searchParams] = useSearchParams();
  const actorId = searchParams.get("actorId");
  const navigate = useNavigate();

  const [actor, setActor] = useState<IActor | null>(null);
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchActor();
    fetchListMovies();
  }, []);

  const fetchActor = async () => {
    try {
      const { data } = await movieApi.getActorById(actorId);
      console.log(data);
      setActor(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchListMovies = async () => {
    try {
      const { data } = await movieApi.getListMoviesByActor(actorId);
      console.log(data);
      setListMovies(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="actor">
      <Header />

      <div className="actor__content">
        <div className="actor__content__name">{actor?.name}</div>

        <div className="actor__content__job">Diễn viên</div>

        <div className="actor__content__dob">
          Ngày sinh: {actor?.dob ? dayjs(actor?.dob).format("DD/MM/YYYY") : ""}
        </div>

        <div className="actor__content__detail">
          <img
            className="actor__content__detail__image"
            src={`${BASE_URL_API}/image/${actor?.image}`}
            alt="Ảnh"
          />

          <div className="actor__content__detail__description">
            {actor?.description}
          </div>
        </div>

        <div className="actor__content__movie">
          <div className="actor__content__movie__title">
            Các bộ phim tham gia
          </div>

          <Row gutter={[24, 24]}>
            {listMovies?.map((i: any) => (
              <Col key={i.id} xs={12} md={8}>
                <div
                  className="item-movie"
                  onClick={() => navigate(`/movie?movieId=${i.id}`)}
                >
                  <img
                    className="item-movie__image"
                    src={`${BASE_URL_API}/image/${i.image}`}
                    alt="Ảnh"
                  />

                  <div className="item-movie__detail">
                    <div className="item-movie__detail__name">{i.name}</div>

                    <div className="item-movie__detail__score">
                      <StarFilled />
                      {i.numberVote > 0 ? Number(i.score).toFixed(1) : ""}/10
                    </div>

                    <div className="item-movie__detail__actor">
                      Trong vai{" "}
                      {
                        i.listMovieActors?.find(
                          (j: any) => j.actor.id == actorId
                        )?.nameInMovie
                      }
                    </div>

                    <div className="item-movie__detail__year">
                      {dayjs(i.releaseDate).format("YYYY")}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Actor;
