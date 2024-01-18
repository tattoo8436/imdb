import { StarFilled } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { movieApi } from "../../apis/movieApi";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { BASE_URL_API } from "../../utils";
import { IMovie } from "../../utils/type";
import { messaging } from "../../configs/firebase";
import { useDispatch, useSelector } from "react-redux";
import { calculatorSlice } from "../../redux/reducers";
import { useRecoilState } from "recoil";
import { numberState } from "../../redux/recoil";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const value = useSelector((state: any) => state.calculator.value);

  const [listTrendings, setListTrendings] = useState<IMovie[]>([]);
  const [listNews, setListNews] = useState<IMovie[]>([]);
  const [notificaion, setNotificaion] = useState({
    title: "",
    body: "",
  });
  const [number, setNumber] = useRecoilState(numberState);

  useEffect(() => {
    // fetchTrendingMovie();
    // fetchNewMovie();

    //Firebase notification
    // getToken(messaging, {
    //   vapidKey:
    //     "BPDune3l6UPEpYeI4x-7QrA4UcgZH1Q1WVsdaSxBdb0OUdlXFI2RHjfLMgt1me9TaXSbVxfzqx4m01gE4K77vow",
    // })
    //   .then((currentToken) => {
    //     if (currentToken) {
    //       console.log("Token: ", currentToken);
    //     } else {
    //       console.log("No token");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // onMessage(messaging, (payload) => {
    //   console.log("Received: ", payload);
    //   toast.info(payload.notification?.body);
    // });

    //Socket
    const socket = new WebSocket("ws://localhost:4000");
    socket.onopen = (e) => {
      console.log(e);
    };
  }, []);

  const handleAddAccount = async () => {
    for (let i = 1; i < 99; i++) {
      const payload = {
        username: `account${i}`,
        password: "123",
        email: `account${i}@gmail.com`,
      };
      console.log(i);
      setTimeout(() => {}, 100);

      // axios.post(
      //   `https://imdb-service-production.up.railway.app/api/register`,
      //   payload
      // );
    }
  };

  const handleAddRating = async () => {
    for (let i = 100; i < 190; i++) {
      const payload = {
        accountAdmin: {
          username: `account${i}`,
          password: "123",
        },
        movieId: 11,
        score: _.random(4, 10),
      };
      await axios.post(`${BASE_URL_API}/rating/movie`, payload);
    }
  };

  const fetchTrendingMovie = async () => {
    setListTrendings([]);
    try {
      const { data } = await movieApi.getTrendingMovie();
      const counts = _.countBy(data);
      const countsArray = _.map(counts, (count, num) => ({
        movieId: parseInt(num),
        count,
      }));
      const sortedCounts = _.orderBy(countsArray, ["count"], ["desc"]);
      console.log(sortedCounts);

      for (let i = 0; i < Math.min(10, sortedCounts.length); i++) {
        const dataMovie = await movieApi.getMovieById(sortedCounts[i].movieId);
        setListTrendings((pre) => [...pre, dataMovie.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNewMovie = async () => {
    try {
      const { data } = await movieApi.searchMovie({
        pageIndex: 1,
        pageSize: 10,
        releaseDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
        sortBy: "releaseDate",
        orderBy: "DESC",
      });
      console.log(data);
      setListNews(data.listMovies);
    } catch (error) {
      console.log(error);
    }
  };

  const fetch1 = new Promise((resolve) => {
    resolve("1");
  });
  const fetch2 = new Promise((resolve, reject) => {
    reject("2");
  });
  const fetch3 = new Promise((resolve) => {
    resolve("3");
  });

  Promise.all([fetch1, fetch2, fetch3])
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="home">
      <Header />

      <div className="home__content">
        <div className="home__content__header card">
          <div className="home__content__header__title">Chào mừng!</div>

          <div className="home__content__header__description">
            Rất nhiều bộ phim, chương trình truyền hình để khám phá.
          </div>

          <Button
            className="home__content__header__search"
            type="primary"
            onClick={() => navigate("/search")}
          >
            Khám phá ngay
          </Button>
        </div>

        <Button className="d-none" type="primary" onClick={handleAddAccount}>
          Tạo tài khoản
        </Button>

        <Button className="d-none" type="primary" onClick={handleAddRating}>
          Tạo đánh giá
        </Button>

        <Button className="d-none" type="primary" onClick={fetchTrendingMovie}>
          Top Trending
        </Button>

        <Button
          className="d-nonee"
          type="primary"
          onClick={() => {
            dispatch(calculatorSlice.actions.add(1));
          }}
        >
          Add
        </Button>

        <Button
          className="d-nonee"
          type="primary"
          onClick={() => {
            setTimeout(() => {
              setNumber((pre) => pre - 2);
            }, 1000);
          }}
        >
          Remove
        </Button>

        <p>{number}</p>

        <div className="home__content__trending">
          <div className="home__content__trending__title">
            <div className="home__content__trending__title__icon"></div>

            <div className="home__content__trending__title__text">
              Top thịnh hành
            </div>
          </div>

          <div className="home__content__trending__content">
            {listTrendings?.map((i) => (
              <div
                key={i.id}
                className="movie-item"
                onClick={() => navigate(`/movie?movieId=${i.id}`)}
              >
                <div className="movie-item__image">
                  <img
                    src={`${BASE_URL_API}/image/${i.image}`}
                    alt="Ảnh"
                    className="movie-item__image__image"
                  />

                  <div className="mask">
                    <StarFilled className="mask__icon" />

                    <div className="mask__score">
                      {i.numberVote > 0 ? i.score.toFixed(1) : ""}/10
                    </div>

                    <div className="mask__genre">
                      {i.listMovieGenres?.map((j) => (
                        <div key={j.id}>{j.genre.name}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="movie-item__name">{i.name}</div>

                <div className="movie-item__year">
                  {i.releaseDate ? dayjs(i.releaseDate).format("YYYY") : ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="home__content__new">
          <div className="home__content__new__title">
            <div className="home__content__new__title__icon"></div>

            <div className="home__content__new__title__text">
              Phim mới phát hành
            </div>
          </div>

          <div className="home__content__new__content">
            {listNews?.map((i) => (
              <div
                key={i.id}
                className="movie-item"
                onClick={() => navigate(`/movie?movieId=${i.id}`)}
              >
                <div className="movie-item__image">
                  <img
                    src={`${BASE_URL_API}/image/${i.image}`}
                    alt="Ảnh"
                    className="movie-item__image__image"
                  />

                  <div className="mask">
                    <StarFilled className="mask__icon" />

                    <div className="mask__score">
                      {i.numberVote > 0 ? i.score.toFixed(1) : ""}/10
                    </div>

                    <div className="mask__genre">
                      {i.listMovieGenres?.map((j) => (
                        <div key={j.id}>{j.genre.name}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="movie-item__name">{i.name}</div>

                <div className="movie-item__year">
                  {i.releaseDate ? dayjs(i.releaseDate).format("YYYY") : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
