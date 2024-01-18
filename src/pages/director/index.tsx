import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IDirector } from "../../utils/type";
import { movieApi } from "../../apis/movieApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Col, Image, Row } from "antd";
import { BASE_URL_API } from "../../utils";
import dayjs from "dayjs";
import { StarFilled } from "@ant-design/icons";

const Director = () => {
  const [searchParams] = useSearchParams();
  const directorId = searchParams.get("directorId");

  const [director, setDirector] = useState<IDirector | null>(null);
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDirector();
    fetchListMovies();
  }, []);

  const fetchDirector = async () => {
    try {
      const { data } = await movieApi.getDirectorById(directorId);
      console.log(data);
      setDirector(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchListMovies = async () => {
    try {
      const { data } = await movieApi.getListMoviesByDirector(directorId);
      console.log(data);
      setListMovies(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="director">
      <Header />

      <div className="director__content">
        <div className="director__content__name">{director?.name}</div>

        <div className="director__content__job">Đạo diễn</div>

        <div className="director__content__dob">
          Ngày sinh:{" "}
          {director?.dob ? dayjs(director?.dob).format("DD/MM/YYYY") : ""}
        </div>

        <div className="director__content__detail">
          <img
            className="director__content__detail__image"
            src={`${BASE_URL_API}/image/${director?.image}`}
            alt="Ảnh"
          />

          <div className="director__content__detail__description">
            {director?.description}
          </div>
        </div>

        <div className="director__content__movie">
          <div className="director__content__movie__title">
            Các bộ phim đạo diễn
          </div>

          <Row gutter={[24, 24]}>
            {listMovies?.map((i: any) => (
              <Col key={i.id} xs={12} md={8}>
                <div className="item-movie">
                  <img
                    className="item-movie__image"
                    src={`${BASE_URL_API}/image/${i.image}`}
                    alt="Ảnh"
                  />

                  <div className="item-movie__detail">
                    <div className="item-movie__detail__name">{i.name}</div>

                    <div className="item-movie__detail__score">
                      <StarFilled />
                      {Number(i.score).toFixed(1)}
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

export default Director;
