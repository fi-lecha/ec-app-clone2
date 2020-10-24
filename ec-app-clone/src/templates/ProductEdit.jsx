import React, { useCallback, useState, useEffect } from "react";
import { TextInput, SelectBox, PrimaryButton } from "../components/UIkit";
import { saveProducts } from "../reducks/products/operations";
import { useDispatch } from "react-redux";
import ImageArea from "../components/Products/ImageArea";
import { db } from "../firebase/index";
import { SetSizeArea } from "../components/Products";

const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split("/product/edit")[1];
  // console.log("Before split /", id);

  if (id !== "") {
    id = id.split("/")[1];
    // console.log("After split /", id);
  }

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [categories, setCategories] = useState([]),
    [gender, setGender] = useState(""),
    [price, setPrice] = useState(""),
    [sizes, setSizes] = useState([]),
    [images, setImages] = useState([]);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );
  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );
  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  // const categories = [
  //   { id: "tops", name: "トップス" },
  //   { id: "shirts", name: "シャツ" },
  //   { id: "tops", name: "パンツ" },
  // ];
  const genders = [
    { id: "all", name: "全て" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
  ];

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setName(data.name);
          setImages(data.images);
          setGender(data.gender);
          setCategory(data.category);
          setPrice(data.price);
          setDescription(data.description);
          setSizes(data.sizes);
        });
    }
    return () => {};
  }, []);

  useEffect(() => {
    db.collection('categories').orderBy("order", "asc").get().then(snapshots => {
        const list = []
        snapshots.forEach(snapshot => {
            list.push(snapshot.data())
        })
        setCategories(list)
    });
},[])

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={"商品名"}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={5}
          value={description}
          type={"text"}
        />
        <SelectBox
          label={"カテゴリー"}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        ></SelectBox>
        <SelectBox
          label={"性別"}
          required={true}
          options={genders}
          select={setGender}
          value={gender}
        ></SelectBox>
        <TextInput
          fullWidth={true}
          label={"価格"}
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type={"number"}
        />
        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes}/>
        <div className="module-spacer--small" />
        <div className="module-spacer--medium">
          <div className="center">
            <PrimaryButton
              label={"商品情報を保存"}
              onClick={() => {
                dispatch(
                  saveProducts(
                    id,
                    name,
                    description,
                    category,
                    gender,
                    price,
                    images,
                    sizes
                  )
                );
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
