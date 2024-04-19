import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserAccess, AddCartItem, getSingleInventory } from '../API';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Singleitem({ SetNewItemtoCart }) {

    const imgAddr = '../src/assets/assets2/'

    const cookies = new Cookies();

    const [singleData, setSingleData] = useState(null);
    let { itemId } = useParams();

    const [quantity, setQuantity] = useState(1);

    const [showAlert, setShowAlert] = useState(false);

    const [addedToCartt, setAddedToCartt] = useState(false);

    const [userAccess, setUserAccess] = useState({
        custId: "",
        username: "",
        role: "",
        isAdmin: ""
    });

    const [showButton, setShowButton] = useState(false)

    const [currently, setCurrently] = useState(0)


    useEffect(() => {
        async function getUserAuth() {

            const user = await getUserAccess()
            setUserAccess({
                custId: user.custId,
                username: user.username,
                role: user.role,
                isAdmin: user.isAdmin
            })
        }

        getUserAuth()
    }, [])

    useEffect(() => {

        async function single() {

            const data = await getSingleInventory(itemId)
            setSingleData(data);
        }

        single();
    }, []);


    async function addToCart(id, quantity) {

        try {

            const Add = await AddCartItem(id, quantity);
            SetNewItemtoCart(Add);
            setShowAlert(true);
            setAddedToCartt(true);
            setCurrently(quantity);
            setShowButton(true)

            
        } catch (error) {
            console.error(error);
        };
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);


    };

    useEffect(() => {

        if (showAlert) {

            setTimeout(() => {
                setShowAlert(false);
                setAddedToCartt(false);
            }, 3000)
        }

    }, [showAlert]);

    console.log(singleData)

    return (
        <div>
            <div>
                <h1>Buy Now</h1>
            </div>
            <div className='itemcard'>
                {singleData ? (
                    <div>

                        <h2>{singleData.name}</h2>
                        <p>${(singleData.price / 100).toFixed(2)}</p>
                        <img src={imgAddr + singleData.imgurl} alt={singleData.name} />
                        <p>Description: {singleData.description}</p>

                        <div className='quantityF'>

                            <div>
                                {cookies.get("isLoggedIn") && !addedToCartt && (
                                    <div>
                                        <Form.Control type="number" value={quantity} onChange={handleQuantityChange} min="1" />
                                    </div>

                                )}
                            </div>

                        </div>

                        <div>
                            {quantity === 1 ? showAlert && <div> <p>Added {quantity} {singleData.name} To Cart!</p></div> :
                                showAlert && <div> <p>Added {quantity} {singleData.name}s To Cart!</p></div>}
                        </div>

                        {cookies.get("isLoggedIn") && !addedToCartt && (
                            <Button onClick={() => addToCart(singleData.id, quantity)} variant="outline-primary" >Update Cart</Button>
                        )}

                        {cookies.get("isLoggedIn") && !addedToCartt && (
                            <p>Currently in Cart: {currently}</p>
                        )}

                        {cookies.get("isLoggedIn") && showButton && (
                            <div className='buttBox'>
                                <div>
                                    <Link className="addToCartLinkButt" to={"/mycart"}> Go to Cart</Link>
                                </div>
                                <div>
                                    <Link className="contiuneShoppingButt" to={"/"}>Keep Shopping</Link>
                                </div>
                            </div>

                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>


        </div>

    )
}