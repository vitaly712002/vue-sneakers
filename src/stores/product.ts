import { requestGetProducts, requestGetFavorites, requestCreateFavorite, requestDeleteFavorite, requestCreateOrder, requestGetOrders } from '@/api/product'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch, type Ref } from 'vue'

export type ProductType = {
  id: number
  imageUrl: string
  title: string
  price: number
  isFavorite?: boolean
  isAdded?: boolean
  favoriteId?: number | null
}

export type OrderType = {
  id: string
  cart: ProductType[]
  totalPrice: number
}

export type FavoriteType = {
  id: number
  item: ProductType
}

export type FilterParams = {
    sortBy?: string
    title?: string
}

export const useProductStore = defineStore('product', () => {
  const products: Ref<ProductType[]> = ref([]);
  const orders: Ref<OrderType[]> = ref([]);
  const favorites: Ref<FavoriteType[]> = ref([]);
  const cart: Ref<ProductType[]> = ref([]);
  const isCreatingOrder: Ref<boolean> = ref(false);
  const lastCreatedOrderId: Ref<number | null> = ref(null)
  const localCart = localStorage.getItem('cart');
  cart.value = localCart ? JSON.parse(localCart) : [];

  const filters = reactive({
    sortBy: 'title',
    searchQuery: ''
  })

  const getProducts = async () => {
    const params: FilterParams = {};
    if (filters.sortBy) {
      params.sortBy = filters.sortBy
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const data = await requestGetProducts(params);

    products.value = data.map((productObj: ProductType) => ({
      ...productObj,
      isFavorite: false,
      favoriteId: null,
      isAdded: cart.value.some((cartItem) => cartItem.id === productObj.id)
    }))
  }

  const getFavorites = async () => {
    const data = await requestGetFavorites();
    favorites.value = data.map(obj => {
      return {
        ...obj, 
        item: {
          ...obj.item,
          isFavorite: true
        }
      }
    });
    products.value = products.value.map((product) => {
      const isFavorite = favorites.value.find(favorite => favorite.item.id === product.id);
        if(!isFavorite) {
          return product;
        }

        return {
          ...product,
          isFavorite: true,
          favoriteId: isFavorite.id
        }
    })
  }

  const addToFavorite = async (item_id: number) => {
    const item = getProductById(item_id);

    if(!item) {
      console.log(`item с id ${item_id} не найден!`);
      return;
    }

    try {
      const oldFavoriteProp = item.isFavorite;
      item.isFavorite = !item.isFavorite;
      if(!oldFavoriteProp) {
        const data = await requestCreateFavorite(item.id);
        item.favoriteId = data.id
        favorites.value.unshift({ id: data.id, item });
      } else {
        if(item.favoriteId) {
          await requestDeleteFavorite(item.favoriteId);
        }
        favorites.value = 
          favorites.value.filter(favorite => favorite.id !== item.favoriteId);
          
        item.favoriteId = null;
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateFilter = (key: keyof typeof filters, value: any) => {
    if (key in filters) {
      filters[key] = value;
    } else {
      console.warn(`Неверный параметр фильтра`);
    }
  }

  const getProductById = (item_id: number) => {
    return products.value.find(item => item_id === item.id)
  }

  const addToCart = (item_id: number) => {
    const item = getProductById(item_id);
    if(!item) return;
    cart.value.push(item);
    item.isAdded = true
  };

    
  const removeFromCart = (item_id: number) => {
    const item = getProductById(item_id);
    if(!item) return;
    cart.value.splice(cart.value.indexOf(item), 1);
    item.isAdded = false;
  };

  const toggleItemCart = (item_id: number) => {
    const item = getProductById(item_id);
    if(!item) return;

    if(!item.isAdded) {
      addToCart(item.id);
    } else {
      removeFromCart(item.id);
    }
  }
  
  const getOrders = async () => {
    const data = await requestGetOrders();
    orders.value = data;
  }

  const createOrder = async () => {
    try {
      isCreatingOrder.value = true;
      const data = await requestCreateOrder(cart.value, totalPrice.value);
      cart.value = [];
      products.value = products.value.map(productObj => {
        return {...productObj, isAdded: false};
      });

      lastCreatedOrderId.value = data.id;
      orders.value.push(data);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      isCreatingOrder.value = false;
    }
  }

  const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + item.price , 0)
  });
  
  const vatPrice = computed(() => {
    return Math.round((totalPrice.value * 5) / 100 );
  })
  
  watch(
    () => ({ ...filters }),
    () => {
      getProducts();
    }
  );
    
  watch(cart, () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }, {deep: true});

  watch(() => products.value.map(product => product.isAdded), () => {
    products.value.forEach(product => {
      const favorite = favorites.value.find(fav => fav.item.id === product.id);
      if (favorite) {
        favorite.item.isAdded = product.isAdded;
      }
    });
  });

  return {
    products,
    orders,
    cart,
    favorites,
    filters,
    totalPrice,
    vatPrice,
    isCreatingOrder,
    lastCreatedOrderId,
    updateFilter,
    getProducts,
    getFavorites,
    addToFavorite,
    addToCart,
    removeFromCart,
    toggleItemCart,
    getOrders,
    createOrder
  }
})
