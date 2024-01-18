import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button, Col, Input, Pagination, Row, Select } from "antd";
import { IMovie, ISearchMovie } from "../../utils/type";
import {
  optionLanguageSearch,
  optionScore,
  optionSort,
  optionType,
  optionYear,
} from "../../utils/constant";
import { movieApi } from "../../apis/movieApi";
import MovieItem from "./MovieItem";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState<ISearchMovie>({
    pageIndex: 1,
    pageSize: 10,
    name: "",
    genreId: null,
    type: null,
    score: null,
    releaseDate: null,
    language: null,
    orderBy: "DESC",
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [listGenres, setListGenres] = useState([]);
  const [listMovies, setListMovies] = useState<IMovie[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchAllGenres();
  }, []);

  useEffect(() => {
    fetchMovie();
  }, [isRefetch]);

  const fetchMovie = async () => {
    setListMovies([]);
    try {
      const { data } = await movieApi.searchMovie({
        ...search,
        score: search.score ? Number(search.score) : null,
        releaseDate: search.releaseDate ? `${search.releaseDate}-01-01` : null,
      });
      console.log({ data });
      setTotalRecords(data?.totalRecords);
      setListMovies(data?.listMovies);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllGenres = async () => {
    try {
      const { data } = await movieApi.searchGenre({
        accountAdmin: {},
        pageIndex: 1,
        pageSize: 999999,
      });
      console.log({ data });
      setListGenres(
        data?.listGenres?.map((i: any) => ({ label: i.name, value: i.id }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search">
      <Header />

      <div className="search__content">
        <div className="search__content__title">Tìm kiếm phim</div>

        <div className="search__content__search-bar">
          <Button className="d-none" onClick={() => console.log("")}>
            Log
          </Button>
          <Row>
            <Col span={12} className="search-bar__name" offset={12}>
              <Input
                className="search-bar__name__input"
                placeholder="Nhập tên phim"
                value={search.name}
                onChange={(e) =>
                  setSearch((pre) => ({ ...pre, name: e.target.value }))
                }
              />
              <Button
                type="primary"
                onClick={() => {
                  setIsRefetch((pre) => !pre);
                }}
              >
                Tìm kiếm
              </Button>
            </Col>

            <Col span={24} className="search-bar__filter">
              <Row gutter={[24, 24]} justify="end">
                <Col span={4} className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">
                    Kiểu phim:
                  </div>

                  <Select
                    className="search-bar__filter__item__input"
                    placeholder="Chọn kiểu phim"
                    options={optionType}
                    value={search.type}
                    onChange={(e) => {
                      if (e) {
                        setSearch((pre) => ({ ...pre, type: e }));
                      } else {
                        setSearch((pre) => ({ ...pre, type: null }));
                      }
                    }}
                    allowClear
                  />
                </Col>

                <Col span={4} className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">
                    Thể loại:
                  </div>

                  <Select
                    className="search-bar__filter__item__input"
                    placeholder="Chọn thể loại"
                    options={listGenres}
                    value={search.genreId}
                    onChange={(e) => {
                      if (e) {
                        setSearch((pre) => ({ ...pre, genreId: e }));
                      } else {
                        setSearch((pre) => ({ ...pre, genreId: null }));
                      }
                    }}
                    allowClear
                  />
                </Col>

                <Col span={4} className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">
                    Đánh giá:
                  </div>

                  <Select
                    className="search-bar__filter__item__input"
                    placeholder="Chọn đánh giá"
                    options={optionScore}
                    value={search.score}
                    onChange={(e) => {
                      if (e) {
                        setSearch((pre) => ({ ...pre, score: e }));
                      } else {
                        setSearch((pre) => ({ ...pre, score: null }));
                      }
                    }}
                    allowClear
                  />
                </Col>

                <Col span={4} className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">Năm:</div>

                  <Select
                    className="search-bar__filter__item__input"
                    placeholder="Chọn năm"
                    options={optionYear}
                    value={search.releaseDate}
                    onChange={(e) => {
                      if (e) {
                        setSearch((pre) => ({ ...pre, releaseDate: e }));
                      } else {
                        setSearch((pre) => ({ ...pre, releaseDate: null }));
                      }
                    }}
                    allowClear
                  />
                </Col>

                <Col span={4} className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">
                    Ngôn ngữ:
                  </div>

                  <Select
                    className="search-bar__filter__item__input"
                    placeholder="Chọn ngôn ngữ"
                    options={optionLanguageSearch}
                    value={search.language}
                    onChange={(e) => {
                      if (e) {
                        setSearch((pre) => ({ ...pre, language: e }));
                      } else {
                        setSearch((pre) => ({ ...pre, language: null }));
                      }
                    }}
                    allowClear
                  />
                </Col>

                <Col span={4} className="search-bar__filter__item">
                  <div className="search-bar__filter__item__label">
                    Sắp xếp theo:
                  </div>

                  <Select
                    className="search-bar__filter__item__input"
                    placeholder="Chọn sắp xếp"
                    options={optionSort}
                    value={search.sortBy}
                    onChange={(e) => {
                      if (e) {
                        setSearch((pre) => ({ ...pre, sortBy: e }));
                      } else {
                        setSearch((pre) => ({ ...pre, sortBy: null }));
                      }
                    }}
                    allowClear
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="search__content__result">
          <Row gutter={[24, 24]}>
            {listMovies.map((i) => (
              <Col span={24} key={i.id}>
                <MovieItem movie={i} navigate={navigate} />
              </Col>
            ))}
          </Row>

          <div className="search__content__result__pagination">
            <Pagination
              current={search.pageIndex}
              total={totalRecords}
              pageSize={search.pageSize}
              onChange={(e) => {
                setSearch((pre: any) => ({ ...pre, pageIndex: e }));
                setIsRefetch((pre) => !pre);
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
