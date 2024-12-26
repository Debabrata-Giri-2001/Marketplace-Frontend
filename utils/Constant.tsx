export type categoryProps = {
    id: string;
    name: string;
    img: string;
  };
  
  export const category: categoryProps[] = [
    {
      id: '1',
      name: 'Imaging',
      img: 'https://printbrix-next-web.vercel.app/home/p-3.png',
    },
    {
      id: '2',
      name: 'Laboratory',
      img: 'https://web.archive.org/web/20230608043429if_/https://printbrix.com/wp-content/uploads/2021/03/Mug.png',
    },
    {
      id: '3',
      name: 'Surgery',
      img: 'https://web.archive.org/web/20230608043443if_/https://printbrix.com/wp-content/uploads/2021/03/Sipper.png',
    },
    {
      id: '4',
      name: 'Monitoring',
      img: 'https://web.archive.org/web/20221202120302im_/https://printbrix.com/wp-content/uploads/2021/03/bag.png',
    },
    {
      id: '5',
      name: 'Respiratory',
      img: 'https://web.archive.org/web/20221202120302im_/https://printbrix.com/wp-content/uploads/2021/03/Jute-Bag.png',
    },
    {
      id: '6',
      name: 'Dental',
      img: 'https://printbrix-next-web.vercel.app/home/note&penimg/1.png',
    },
    {
      id: '7',
      name: 'Cardiology',
      img: 'https://printbrix-next-web.vercel.app/home/p-4.jpeg',
    },
    {
      id: '8',
      name: 'More',
      img: '',
    },
  ];
  export const tags = [
    {
      id: '1',
      name: 'Men',
    },
    {
      id: '2',
      name: 'Women',
    },
    {
      id: '3',
      name: 'Kid',
    },
    {
      id: '4',
      name: 'Sports',
    },
    {
      id: '5',
      name: 'Beauty',
    },
  ];
  
  //Products
  export type productProps = {
    id: string;
    name: string;
    category?: string;
    itemSold: string;
    rating?: number;
    img: string;
    price: number;
    originalPrice: number;
    offer?: string;
    status?: string;
  };
  
  export const productData: productProps[] = [
    {
      id: '1',
      name: 'Traditional Mug',
      category: 'Mug',
      itemSold: '8.2k',
      rating: 4.5,
      img: 'https://printbrix-next-web.vercel.app/home/coffee&mug/1.png',
      price: 205,
      originalPrice: 305,
      offer: '20% off',
      status: 'In Stock',
    },
    {
      id: '2',
      name: 'White Coffee Mug',
      category: 'Mug',
      itemSold: '1k',
      rating: 4.5,
      img: 'https://printbrix-next-web.vercel.app/home/coffee&mug/2.png',
      price: 105,
      originalPrice: 170,
      offer: '30% off',
      status: 'Out Stock',
    },
    {
      id: '3',
      name: 'Bamboo Water Bottle',
      category: 'Bottle',
      itemSold: '826',
      rating: 4.5,
      img: 'https://printbrix-next-web.vercel.app/home/waterbottle/1.png',
      price: 225,
      originalPrice: 305,
      offer: '20% off',
      status: 'In Stock',
    },
    {
      id: '4',
      name: 'Grey Water Bottle',
      category: 'Bottle',
      itemSold: '226',
      rating: 4.5,
      img: 'https://printbrix-next-web.vercel.app/home/waterbottle/3.png',
      price: 120,
      originalPrice: 375,
      offer: '50% off',
      status: 'In Stock',
    },
    {
      id: '5',
      name: 'Matt Black Water Bottle',
      category: 'Bottle',
      itemSold: '82',
      rating: 4.5,
      img: 'https://printbrix-next-web.vercel.app/home/waterbottle/4.png',
      price: 305,
      originalPrice: 455,
      offer: '10% off',
      status: 'Out Stock',
    },
    {
      id: '6',
      name: 'Sport Bottle',
      category: 'Bottle',
      itemSold: '2.6k',
      rating: 4.5,
      img: 'https://printbrix-next-web.vercel.app/home/waterbottle/5.png',
      price: 105,
      originalPrice: 305,
      offer: '20% off',
      status: 'Limited Stock',
    },
    {
      id: '7',
      name: 'Bamboo Polo T-Shirt',
      category: 'Tshirt',
      itemSold: '2k',
      rating: 4.5,
      img: 'https://printbrix-next-web.vercel.app/home/p-2.png',
      price: 133,
      originalPrice: 355,
      offer: '20% off',
      status: 'In Stock',
    },
    {
      id: '8',
      name: 'Bamboo Polo T-Shirt',
      category: 'Tshirt',
      itemSold: '1.6k',
      rating: 4.5,
      img: '',
      price: 105,
      originalPrice: 455,
      offer: '20% off',
      status: 'Out Stock',
    },
    {
      id: '9',
      name: 'Bamboo Polo T-Shirt',
      category: 'Tshirt',
      itemSold: '86',
      rating: 4.5,
      img: '',
      price: 105,
      originalPrice: 257,
      offer: '70% off',
      status: 'In Stock',
    },
    {
      id: '10',
      name: 'Bamboo Polo T-Shirt',
      category: 'Tshirt',
      itemSold: '8',
      rating: 4.5,
      img: 'https://printbrix-next-web.vercel.app/home/productimgenotavailable.jpg',
      price: 105,
      originalPrice: 305,
      offer: '20% off',
      status: 'In Stock',
    },
  ];
  
  //Merchandise details
  export type MerchandiseProps = {
    id: string;
    name: string;
    category: string;
    img: string;
    price: number;
    originalPrice: number;
    description?: string;
    creator: string;
  };
  
  export const MerchandiseData: MerchandiseProps[] = [
    {
      id: '1',
      name: 'Traditional Mug',
      category: 'Mug',
      img: 'https://web.archive.org/web/20230608043429if_/https://printbrix.com/wp-content/uploads/2021/03/Mug.png',
      price: 205,
      originalPrice: 305,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, saepe!',
      creator: 'Mark john',
    },
  
    {
      id: '2',
      name: 'White Coffee Mug',
      category: 'Mug',
      img: 'https://web.archive.org/web/20230608043440if_/https://printbrix.com/wp-content/uploads/2021/03/Cup.png',
      price: 204,
      originalPrice: 305,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, saepe!',
      creator: 'alex',
    },
    {
      id: '3',
      name: 'Bamboo Water Bottle',
      category: 'Bottle',
      img: 'https://web.archive.org/web/20230608043443if_/https://printbrix.com/wp-content/uploads/2021/04/Bamboo-Bottle.png',
      price: 205,
      originalPrice: 305,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, saepe!',
      creator: 'John smith',
    },
    {
      id: '4',
      name: 'Grey Water Bottle',
      category: 'Bottle',
      img: 'https://web.archive.org/web/20230608043503if_/https://printbrix.com/wp-content/uploads/2021/03/Bottle-3.png',
      price: 105,
      originalPrice: 205,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, saepe!',
      creator: 'Alan Smith',
    },
    {
      id: '5',
      name: 'Red Water Bottle',
      category: 'Bottle',
      img: 'https://web.archive.org/web/20230608043423if_/https://printbrix.com/wp-content/uploads/2021/03/Bottle-4.png',
      price: 205,
      originalPrice: 305,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, saepe!',
      creator: 'Alan Smith',
    },
    {
      id: '6',
      name: 'Sport Bottle',
      category: 'Bottle',
      img: 'https://web.archive.org/web/20230608043443if_/https://printbrix.com/wp-content/uploads/2021/03/Sipper.png',
      price: 205,
      originalPrice: 305,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, saepe!',
      creator: 'Barry Allen',
    },
    {
      id: '7',
      name: 'Navy Sleek and Minimal Dual Strap Laptop Bag',
      category: 'Bag',
      price: 205,
      originalPrice: 305,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, saepe!',
      img: 'https://web.archive.org/web/20221202120302im_/https://printbrix.com/wp-content/uploads/2021/03/Laptop-bagg.png',
      creator: 'Barry Allen',
    },
    {
      id: '8',
      name: 'Bamboo Polo T-shirt',
      category: 'Tshirt',
      price: 205,
      originalPrice: 305,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, saepe!',
      img: 'https://printbrix-next-web.vercel.app/home/p-2.png',
      creator: 'John Doe',
    },
    {
      id: '9',
      name: 'Bamboo Polo T-shirt',
      category: 'Tshirt',
      price: 205,
      originalPrice: 305,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, saepe!',
      img: 'https://printbrix-next-web.vercel.app/home/p-5.png',
      creator: 'ohn Doe',
    },
    {
      id: '10',
      name: 'Bamboo Polo T-shirt',
      category: 'Tshirt',
      price: 205,
      originalPrice: 305,
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, saepe!',
      img: 'https://printbrix-next-web.vercel.app/home/productimgenotavailable.jpg',
      creator: 'Barry Allen',
    },
  ];
  
  //newly arrival items
  export type NewProductProps = {
    id: number;
    title: string;
    img: string;
  };
  export const newProducts: NewProductProps[] = [
    {
      id: 1,
      title: 'Kiara Kids Raincoat',
      img: 'https://printbrix-next-web.vercel.app/home/newarrival3.png',
    },
    {
      id: 2,
      title: 'American Tourister Bag',
      img: 'https://printbrix-next-web.vercel.app/home/newarrival4.png',
    },
    {
      id: 3,
      title: 'American Tourister Bagpacks',
      img: 'https://printbrix-next-web.vercel.app/home/newarrival5.png',
    },
    {
      id: 4,
      title: 'Blazer',
      img: 'https://printbrix-next-web.vercel.app/home/newarrival6.png',
    },
    {
      id: 5,
      title: 'Skylark Rain Suite',
      img: 'https://printbrix-next-web.vercel.app/home/newarrival2.png',
    },
    {
      id: 6,
      title: 'Rakhi Hampers',
      img: 'https://printbrix-next-web.vercel.app/home/newarrival7.png',
    },
  ];
  
  //Offers
  export type OfferCustomCarouselProps = {
    id: string;
    img: string;
  };
  
  export const offerCustomCarouselData: OfferCustomCarouselProps[] = [
    {
      id: '1',
      img: 'https://img.freepik.com/free-photo/sale-products-with-discount_23-2150296295.jpg?w=826&t=st=1694782210~exp=1694782810~hmac=1e354b5202c3c41273d962efe2eb72a78e5ef70c367c89b0a86b42ac63a41234',
    },
    {
      id: '2',
      img: 'https://img.freepik.com/free-photo/discount-promotion-clearance-commercial-deal-concept_53876-122566.jpg?size=626&ext=jpg',
    },
    {
      id: '3',
      img: 'https://img.freepik.com/free-photo/sale-products-with-discount_23-2150296291.jpg?size=626&ext=jpg',
    },
    {
      id: '4',
      img: 'https://img.freepik.com/free-photo/big-sale-discounts-products_23-2150336692.jpg?size=626&ext=jpg',
    },
    {
      id: '5',
      img: 'https://img.freepik.com/free-photo/big-sale-discounts-products_23-2150336701.jpg?size=626&ext=jpg',
    },
    {
      id: '6',
      img: 'https://img.freepik.com/free-vector/summer-sale-with-sunglasses-realistic-style_23-2147807017.jpg?w=740&t=st=1694783112~exp=1694783712~hmac=15e360786ecb47ddf58b3b0c476c9718946f29a1fff4e292d65b3aa4cc3b779f',
    },
  ];
  
  //data offer Custom carousel
  
  export type offersProps = {
    id: string;
    img: string;
    title: string;
    price: number;
  };
  export const offerData: offersProps[] = [
    {
      id: '1',
      img: 'https://img.freepik.com/free-photo/happy-lady-stylish-skirt-boater-posing-pink-wall_197531-23653.jpg?size=626&ext=jpg',
      title: "Women's clothing",
      price: 499,
    },
    {
      id: '2',
      img: 'https://img.freepik.com/free-photo/fashion-portrait-young-beautiful-teen-girls-studio_155003-9016.jpg?w=360&t=st=1694688641~exp=1694689241~hmac=c9c8ff2d7b2e237fb903189c25b863faea532d3d8552ee777d9ccc8175f349a9',
      title: "Kid's clothing",
      price: 299,
    },
    {
      id: '3',
      img: 'https://img.freepik.com/free-photo/front-view-modern-dark-sunglasses-pair-white-yellow_140725-18266.jpg?size=626&ext=jpg',
      title: "Eye wear's",
      price: 399,
    },
    {
      id: '4',
      img: 'https://printbrix-next-web.vercel.app/home/categoryimage/3.png',
      title: "Foot wear's",
      price: 399,
    },
  
    {
      id: '5',
      img: 'https://printbrix-next-web.vercel.app/home/categoryimage/5.png',
      title: "Luggage's & Bags",
      price: 999,
    },
    {
      id: '6',
      img: 'https://printbrix-next-web.vercel.app/home/categoryimage/6.png',
      title: "Watches's",
      price: 1999,
    },
    {
      id: '7',
      img: 'https://printbrix-next-web.vercel.app/home/categoryimage/7.png',
      title: 'Beauty & Make up',
      price: 999,
    },
    {
      id: '8',
      img: 'https://printbrix-next-web.vercel.app/home/categoryimage/8.png',
      title: 'Handbags',
      price: 999,
    },
  ];
  
  // order items
  export type product = {
    id: number;
    name: string;
    color: string;
    clrName: string;
    size: number;
    quantity: number;
    img: string;
    price: number;
    status: string;
    orderId: string;
  };
  
  export const productDataActive: product[] = [
    {
      id: 1,
      name: 'Traditional Mug',
      color: 'muted.900',
      clrName: 'Black',
      size: 42,
      quantity: 1,
      img: 'https://web.archive.org/web/20230608043429if_/https://printbrix.com/wp-content/uploads/2021/03/Mug.png',
      price: 105,
      status: 'In Delivery',
      orderId: '#0D329000965487',
    },
    {
      id: 2,
      name: 'White Coffee Mug',
      color: 'muted.500',
      clrName: 'Grey',
      size: 42,
      quantity: 2,
      img: 'https://web.archive.org/web/20230608043440if_/https://printbrix.com/wp-content/uploads/2021/03/Cup.png',
      price: 105,
      status: 'In Delivery',
      orderId: '#0D329000965487',
    },
    {
      id: 3,
      name: 'Bamboo Water Bottle',
      color: 'amber.200',
      clrName: 'yellow',
      size: 42,
      quantity: 2,
      img: 'https://web.archive.org/web/20230608043443if_/https://printbrix.com/wp-content/uploads/2021/04/Bamboo-Bottle.png',
      price: 105,
      status: 'In Delivery',
      orderId: '#0D329000965487',
    },
    {
      id: 4,
      name: 'Grey Water Bottle',
      color: 'muted.300',
      clrName: 'grey',
      size: 42,
      quantity: 3,
      img: 'https://web.archive.org/web/20230608043503if_/https://printbrix.com/wp-content/uploads/2021/03/Bottle-3.png',
      price: 105,
      status: 'In Delivery',
      orderId: '#0D329000965487',
    },
    {
      id: 5,
      name: 'Red Water Bottle',
      color: 'error.500',
      clrName: 'Red',
      size: 42,
      quantity: 1,
      img: 'https://web.archive.org/web/20230608043423if_/https://printbrix.com/wp-content/uploads/2021/03/Bottle-4.png',
      price: 105,
      status: 'In Delivery',
      orderId: '#0D329000965487',
    },
    {
      id: 6,
      name: 'Sport Bottle',
      color: 'muted.900',
      clrName: 'Black',
      size: 42,
      quantity: 2,
      img: 'https://web.archive.org/web/20230608043443if_/https://printbrix.com/wp-content/uploads/2021/03/Sipper.png',
      price: 105,
      status: 'In Delivery',
      orderId: '#0D329000965487',
    },
  ];
  export const productDataCompleted: product[] = [
    {
      id: 1,
      name: 'White Mug',
      color: 'muted.900',
      clrName: 'Black',
      size: 42,
      quantity: 1,
      img: 'https://img.freepik.com/free-vector/cup-mockup_1053-247.jpg?size=626&ext=jpg&ga=GA1.1.850538761.1688381857&semt=ais',
      price: 105,
      status: 'Completed',
      orderId: '#0D329000965487',
    },
    {
      id: 2,
      name: 'Black Coffee Mug',
      color: 'muted.500',
      clrName: 'Grey',
      size: 42,
      quantity: 2,
      img: 'https://img.freepik.com/free-vector/black-mug-isolated_1284-42454.jpg?size=626&ext=jpg&ga=GA1.1.850538761.1688381857&semt=ais',
      price: 105,
      status: 'Completed',
      orderId: '#0D329000965487',
    },
    {
      id: 3,
      name: 'Coffee break',
      color: 'amber.200',
      clrName: 'yellow',
      size: 42,
      quantity: 2,
      img: 'https://img.freepik.com/free-psd/realistic-coffee-cup-element_23-2150397998.jpg?size=626&ext=jpg&ga=GA1.2.850538761.1688381857&semt=ais',
      price: 105,
      status: 'Completed',
      orderId: '#0D329000965487',
    },
    {
      id: 4,
      name: 'Coffee Cup',
      color: 'muted.300',
      clrName: 'grey',
      size: 42,
      quantity: 3,
      img: 'https://img.freepik.com/free-psd/white-mug-isolated-background_1409-3593.jpg?size=626&ext=jpg&ga=GA1.2.850538761.1688381857&semt=ais',
      price: 105,
      status: 'Completed',
      orderId: '#0D329000965487',
    },
    {
      id: 5,
      name: 'Red Coffee Cup',
      color: 'error.500',
      clrName: 'Red',
      size: 42,
      quantity: 1,
      img: 'https://img.freepik.com/free-photo/red-mug-with-reflections_1203-1940.jpg?size=626&ext=jpg&ga=GA1.2.850538761.1688381857&semt=ais',
      price: 105,
      status: 'Completed',
      orderId: '#0D329000965487',
    },
    {
      id: 6,
      name: 'Espresso Cup',
      color: 'muted.900',
      clrName: 'Black',
      size: 42,
      quantity: 2,
      img: 'https://img.freepik.com/free-vector/cup-tea-vector-realistic-isolated-white-illlustration-plate_1268-18066.jpg?size=626&ext=jpg&ga=GA1.2.850538761.1688381857&semt=ais',
      price: 105,
      status: 'Completed',
      orderId: '#0D329000965487',
    },
  ];
  
  //Posters
  export type posterProps = {
    id: string;
    poster: string;
  };
  export const posterData: posterProps[] = [
    {
      id: '01',
      poster:
        'https://img.freepik.com/free-vector/black-friday-sale-deals-offer-modern-background_1055-9041.jpg?size=626&ext=jpg',
    },
    {
      id: '02',
      poster:
        'https://img.freepik.com/free-photo/big-sale-retail-with-presents-card_23-2149656623.jpg?w=996&t=st=1693400787~exp=1693401387~hmac=ae6b1bf19cf3bd902c2f251372a42579c899fbb58d2b941d56bc22afbebcaa96',
    },
  
    {
      id: '03',
      poster:
        'https://img.freepik.com/free-vector/mega-sale-banner-blue-yellow-colors_1017-32176.jpg?size=626&ext=jpg',
    },
    {
      id: '04',
      poster:
        'https://img.freepik.com/free-photo/big-sale-retail-with-presents-card_23-2149656623.jpg?w=996&t=st=1693400787~exp=1693401387~hmac=ae6b1bf19cf3bd902c2f251372a42579c899fbb58d2b941d56bc22afbebcaa96',
    },
  
    {
      id: '05',
      poster:
        'https://img.freepik.com/free-vector/mega-sale-banner-blue-yellow-colors_1017-32176.jpg?size=626&ext=jpg',
    },
  ];
  
  export default [
    { code: 'AD', name: 'Andorra', phone: '376' },
    {
      code: 'AE',
      name: 'United Arab Emirates',
      phone: '971',
    },
    { code: 'AF', name: 'Afghanistan', phone: '93' },
    {
      code: 'AG',
      name: 'Antigua and Barbuda',
      phone: '1-268',
    },
    { code: 'AI', name: 'Anguilla', phone: '1-264' },
    { code: 'AL', name: 'Albania', phone: '355' },
    { code: 'AM', name: 'Armenia', phone: '374' },
    { code: 'AO', name: 'Angola', phone: '244' },
    { code: 'AQ', name: 'Antarctica', phone: '672' },
    { code: 'AR', name: 'Argentina', phone: '54' },
    { code: 'AS', name: 'American Samoa', phone: '1-684' },
    { code: 'AT', name: 'Austria', phone: '43' },
    {
      code: 'AU',
      name: 'Australia',
      phone: '61',
      suggested: true,
    },
    { code: 'AW', name: 'Aruba', phone: '297' },
    { code: 'AX', name: 'Alland Islands', phone: '358' },
    { code: 'AZ', name: 'Azerbaijan', phone: '994' },
    {
      code: 'BA',
      name: 'Bosnia and Herzegovina',
      phone: '387',
    },
    { code: 'BB', name: 'Barbados', phone: '1-246' },
    { code: 'BD', name: 'Bangladesh', phone: '880' },
    { code: 'BE', name: 'Belgium', phone: '32' },
    { code: 'BF', name: 'Burkina Faso', phone: '226' },
    { code: 'BG', name: 'Bulgaria', phone: '359' },
    { code: 'BH', name: 'Bahrain', phone: '973' },
    { code: 'BI', name: 'Burundi', phone: '257' },
    { code: 'BJ', name: 'Benin', phone: '229' },
    { code: 'BL', name: 'Saint Barthelemy', phone: '590' },
    { code: 'BM', name: 'Bermuda', phone: '1-441' },
    { code: 'BN', name: 'Brunei Darussalam', phone: '673' },
    { code: 'BO', name: 'Bolivia', phone: '591' },
    { code: 'BR', name: 'Brazil', phone: '55' },
    { code: 'BS', name: 'Bahamas', phone: '1-242' },
    { code: 'BT', name: 'Bhutan', phone: '975' },
    { code: 'BV', name: 'Bouvet Island', phone: '47' },
    { code: 'BW', name: 'Botswana', phone: '267' },
    { code: 'BY', name: 'Belarus', phone: '375' },
    { code: 'BZ', name: 'Belize', phone: '501' },
    {
      code: 'CA',
      name: 'Canada',
      phone: '1',
      suggested: true,
    },
    {
      code: 'CC',
      name: 'Cocos (Keeling) Islands',
      phone: '61',
    },
    {
      code: 'CD',
      name: 'Congo, Democratic Republic of the',
      phone: '243',
    },
    {
      code: 'CF',
      name: 'Central African Republic',
      phone: '236',
    },
    {
      code: 'CG',
      name: 'Congo, Republic of the',
      phone: '242',
    },
    { code: 'CH', name: 'Switzerland', phone: '41' },
    { code: 'CI', name: "Cote d'Ivoire", phone: '225' },
    { code: 'CK', name: 'Cook Islands', phone: '682' },
    { code: 'CL', name: 'Chile', phone: '56' },
    { code: 'CM', name: 'Cameroon', phone: '237' },
    { code: 'CN', name: 'China', phone: '86' },
    { code: 'CO', name: 'Colombia', phone: '57' },
    { code: 'CR', name: 'Costa Rica', phone: '506' },
    { code: 'CU', name: 'Cuba', phone: '53' },
    { code: 'CV', name: 'Cape Verde', phone: '238' },
    { code: 'CW', name: 'Curacao', phone: '599' },
    { code: 'CX', name: 'Christmas Island', phone: '61' },
    { code: 'CY', name: 'Cyprus', phone: '357' },
    { code: 'CZ', name: 'Czech Republic', phone: '420' },
    {
      code: 'DE',
      name: 'Germany',
      phone: '49',
      suggested: true,
    },
    { code: 'DJ', name: 'Djibouti', phone: '253' },
    { code: 'DK', name: 'Denmark', phone: '45' },
    { code: 'DM', name: 'Dominica', phone: '1-767' },
    {
      code: 'DO',
      name: 'Dominican Republic',
      phone: '1-809',
    },
    { code: 'DZ', name: 'Algeria', phone: '213' },
    { code: 'EC', name: 'Ecuador', phone: '593' },
    { code: 'EE', name: 'Estonia', phone: '372' },
    { code: 'EG', name: 'Egypt', phone: '20' },
    { code: 'EH', name: 'Western Sahara', phone: '212' },
    { code: 'ER', name: 'Eritrea', phone: '291' },
    { code: 'ES', name: 'Spain', phone: '34' },
    { code: 'ET', name: 'Ethiopia', phone: '251' },
    { code: 'FI', name: 'Finland', phone: '358' },
    { code: 'FJ', name: 'Fiji', phone: '679' },
    {
      code: 'FK',
      name: 'Falkland Islands (Malvinas)',
      phone: '500',
    },
    {
      code: 'FM',
      name: 'Micronesia, Federated States of',
      phone: '691',
    },
    { code: 'FO', name: 'Faroe Islands', phone: '298' },
    {
      code: 'FR',
      name: 'France',
      phone: '33',
      suggested: true,
    },
    { code: 'GA', name: 'Gabon', phone: '241' },
    { code: 'GB', name: 'United Kingdom', phone: '44' },
    { code: 'GD', name: 'Grenada', phone: '1-473' },
    { code: 'GE', name: 'Georgia', phone: '995' },
    { code: 'GF', name: 'French Guiana', phone: '594' },
    { code: 'GG', name: 'Guernsey', phone: '44' },
    { code: 'GH', name: 'Ghana', phone: '233' },
    { code: 'GI', name: 'Gibraltar', phone: '350' },
    { code: 'GL', name: 'Greenland', phone: '299' },
    { code: 'GM', name: 'Gambia', phone: '220' },
    { code: 'GN', name: 'Guinea', phone: '224' },
    { code: 'GP', name: 'Guadeloupe', phone: '590' },
    { code: 'GQ', name: 'Equatorial Guinea', phone: '240' },
    { code: 'GR', name: 'Greece', phone: '30' },
    {
      code: 'GS',
      name: 'South Georgia and the South Sandwich Islands',
      phone: '500',
    },
    { code: 'GT', name: 'Guatemala', phone: '502' },
    { code: 'GU', name: 'Guam', phone: '1-671' },
    { code: 'GW', name: 'Guinea-Bissau', phone: '245' },
    { code: 'GY', name: 'Guyana', phone: '592' },
    { code: 'HK', name: 'Hong Kong', phone: '852' },
    {
      code: 'HM',
      name: 'Heard Island and McDonald Islands',
      phone: '672',
    },
    { code: 'HN', name: 'Honduras', phone: '504' },
    { code: 'HR', name: 'Croatia', phone: '385' },
    { code: 'HT', name: 'Haiti', phone: '509' },
    { code: 'HU', name: 'Hungary', phone: '36' },
    { code: 'ID', name: 'Indonesia', phone: '62' },
    { code: 'IE', name: 'Ireland', phone: '353' },
    { code: 'IL', name: 'Israel', phone: '972' },
    { code: 'IM', name: 'Isle of Man', phone: '44' },
    { code: 'IN', name: 'India', phone: '91' },
    {
      code: 'IO',
      name: 'British Indian Ocean Territory',
      phone: '246',
    },
    { code: 'IQ', name: 'Iraq', phone: '964' },
    {
      code: 'IR',
      name: 'Iran, Islamic Republic of',
      phone: '98',
    },
    { code: 'IS', name: 'Iceland', phone: '354' },
    { code: 'IT', name: 'Italy', phone: '39' },
    { code: 'JE', name: 'Jersey', phone: '44' },
    { code: 'JM', name: 'Jamaica', phone: '1-876' },
    { code: 'JO', name: 'Jordan', phone: '962' },
    {
      code: 'JP',
      name: 'Japan',
      phone: '81',
      suggested: true,
    },
    { code: 'KE', name: 'Kenya', phone: '254' },
    { code: 'KG', name: 'Kyrgyzstan', phone: '996' },
    { code: 'KH', name: 'Cambodia', phone: '855' },
    { code: 'KI', name: 'Kiribati', phone: '686' },
    { code: 'KM', name: 'Comoros', phone: '269' },
    {
      code: 'KN',
      name: 'Saint Kitts and Nevis',
      phone: '1-869',
    },
    {
      code: 'KP',
      name: "Korea, Democratic People's Republic of",
      phone: '850',
    },
    { code: 'KR', name: 'Korea, Republic of', phone: '82' },
    { code: 'KW', name: 'Kuwait', phone: '965' },
    { code: 'KY', name: 'Cayman Islands', phone: '1-345' },
    { code: 'KZ', name: 'Kazakhstan', phone: '7' },
    {
      code: 'LA',
      name: "Lao People's Democratic Republic",
      phone: '856',
    },
    { code: 'LB', name: 'Lebanon', phone: '961' },
    { code: 'LC', name: 'Saint Lucia', phone: '1-758' },
    { code: 'LI', name: 'Liechtenstein', phone: '423' },
    { code: 'LK', name: 'Sri Lanka', phone: '94' },
    { code: 'LR', name: 'Liberia', phone: '231' },
    { code: 'LS', name: 'Lesotho', phone: '266' },
    { code: 'LT', name: 'Lithuania', phone: '370' },
    { code: 'LU', name: 'Luxembourg', phone: '352' },
    { code: 'LV', name: 'Latvia', phone: '371' },
    { code: 'LY', name: 'Libya', phone: '218' },
    { code: 'MA', name: 'Morocco', phone: '212' },
    { code: 'MC', name: 'Monaco', phone: '377' },
    {
      code: 'MD',
      name: 'Moldova, Republic of',
      phone: '373',
    },
    { code: 'ME', name: 'Montenegro', phone: '382' },
    {
      code: 'MF',
      name: 'Saint Martin (French part)',
      phone: '590',
    },
    { code: 'MG', name: 'Madagascar', phone: '261' },
    { code: 'MH', name: 'Marshall Islands', phone: '692' },
    {
      code: 'MK',
      name: 'Macedonia, the Former Yugoslav Republic of',
      phone: '389',
    },
    { code: 'ML', name: 'Mali', phone: '223' },
    { code: 'MM', name: 'Myanmar', phone: '95' },
    { code: 'MN', name: 'Mongolia', phone: '976' },
    { code: 'MO', name: 'Macao', phone: '853' },
    {
      code: 'MP',
      name: 'Northern Mariana Islands',
      phone: '1-670',
    },
    { code: 'MQ', name: 'Martinique', phone: '596' },
    { code: 'MR', name: 'Mauritania', phone: '222' },
    { code: 'MS', name: 'Montserrat', phone: '1-664' },
    { code: 'MT', name: 'Malta', phone: '356' },
    { code: 'MU', name: 'Mauritius', phone: '230' },
    { code: 'MV', name: 'Maldives', phone: '960' },
    { code: 'MW', name: 'Malawi', phone: '265' },
    { code: 'MX', name: 'Mexico', phone: '52' },
    { code: 'MY', name: 'Malaysia', phone: '60' },
    { code: 'MZ', name: 'Mozambique', phone: '258' },
    { code: 'NA', name: 'Namibia', phone: '264' },
    { code: 'NC', name: 'New Caledonia', phone: '687' },
    { code: 'NE', name: 'Niger', phone: '227' },
    { code: 'NF', name: 'Norfolk Island', phone: '672' },
    { code: 'NG', name: 'Nigeria', phone: '234' },
    { code: 'NI', name: 'Nicaragua', phone: '505' },
    { code: 'NL', name: 'Netherlands', phone: '31' },
    { code: 'NO', name: 'Norway', phone: '47' },
    { code: 'NP', name: 'Nepal', phone: '977' },
    { code: 'NR', name: 'Nauru', phone: '674' },
    { code: 'NU', name: 'Niue', phone: '683' },
    { code: 'NZ', name: 'New Zealand', phone: '64' },
    { code: 'OM', name: 'Oman', phone: '968' },
    { code: 'PA', name: 'Panama', phone: '507' },
    { code: 'PE', name: 'Peru', phone: '51' },
    { code: 'PF', name: 'French Polynesia', phone: '689' },
    { code: 'PG', name: 'Papua New Guinea', phone: '675' },
    { code: 'PH', name: 'Philippines', phone: '63' },
    { code: 'PK', name: 'Pakistan', phone: '92' },
    { code: 'PL', name: 'Poland', phone: '48' },
    {
      code: 'PM',
      name: 'Saint Pierre and Miquelon',
      phone: '508',
    },
    { code: 'PN', name: 'Pitcairn', phone: '870' },
    { code: 'PR', name: 'Puerto Rico', phone: '1' },
    {
      code: 'PS',
      name: 'Palestine, State of',
      phone: '970',
    },
    { code: 'PT', name: 'Portugal', phone: '351' },
    { code: 'PW', name: 'Palau', phone: '680' },
    { code: 'PY', name: 'Paraguay', phone: '595' },
    { code: 'QA', name: 'Qatar', phone: '974' },
    { code: 'RE', name: 'Reunion', phone: '262' },
    { code: 'RO', name: 'Romania', phone: '40' },
    { code: 'RS', name: 'Serbia', phone: '381' },
    { code: 'RU', name: 'Russian Federation', phone: '7' },
    { code: 'RW', name: 'Rwanda', phone: '250' },
    { code: 'SA', name: 'Saudi Arabia', phone: '966' },
    { code: 'SB', name: 'Solomon Islands', phone: '677' },
    { code: 'SC', name: 'Seychelles', phone: '248' },
    { code: 'SD', name: 'Sudan', phone: '249' },
    { code: 'SE', name: 'Sweden', phone: '46' },
    { code: 'SG', name: 'Singapore', phone: '65' },
    { code: 'SH', name: 'Saint Helena', phone: '290' },
    { code: 'SI', name: 'Slovenia', phone: '386' },
    {
      code: 'SJ',
      name: 'Svalbard and Jan Mayen',
      phone: '47',
    },
    { code: 'SK', name: 'Slovakia', phone: '421' },
    { code: 'SL', name: 'Sierra Leone', phone: '232' },
    { code: 'SM', name: 'San Marino', phone: '378' },
    { code: 'SN', name: 'Senegal', phone: '221' },
    { code: 'SO', name: 'Somalia', phone: '252' },
    { code: 'SR', name: 'Suriname', phone: '597' },
    { code: 'SS', name: 'South Sudan', phone: '211' },
    {
      code: 'ST',
      name: 'Sao Tome and Principe',
      phone: '239',
    },
    { code: 'SV', name: 'El Salvador', phone: '503' },
    {
      code: 'SX',
      name: 'Sint Maarten (Dutch part)',
      phone: '1-721',
    },
    {
      code: 'SY',
      name: 'Syrian Arab Republic',
      phone: '963',
    },
    { code: 'SZ', name: 'Swaziland', phone: '268' },
    {
      code: 'TC',
      name: 'Turks and Caicos Islands',
      phone: '1-649',
    },
    { code: 'TD', name: 'Chad', phone: '235' },
    {
      code: 'TF',
      name: 'French Southern Territories',
      phone: '262',
    },
    { code: 'TG', name: 'Togo', phone: '228' },
    { code: 'TH', name: 'Thailand', phone: '66' },
    { code: 'TJ', name: 'Tajikistan', phone: '992' },
    { code: 'TK', name: 'Tokelau', phone: '690' },
    { code: 'TL', name: 'Timor-Leste', phone: '670' },
    { code: 'TM', name: 'Turkmenistan', phone: '993' },
    { code: 'TN', name: 'Tunisia', phone: '216' },
    { code: 'TO', name: 'Tonga', phone: '676' },
    { code: 'TR', name: 'Turkey', phone: '90' },
    {
      code: 'TT',
      name: 'Trinidad and Tobago',
      phone: '1-868',
    },
    { code: 'TV', name: 'Tuvalu', phone: '688' },
    {
      code: 'TW',
      name: 'Taiwan, Province of China',
      phone: '886',
    },
    {
      code: 'TZ',
      name: 'United Republic of Tanzania',
      phone: '255',
    },
    { code: 'UA', name: 'Ukraine', phone: '380' },
    { code: 'UG', name: 'Uganda', phone: '256' },
    {
      code: 'US',
      name: 'United States',
      phone: '1',
      suggested: true,
    },
    { code: 'UY', name: 'Uruguay', phone: '598' },
    { code: 'UZ', name: 'Uzbekistan', phone: '998' },
    {
      code: 'VA',
      name: 'Holy See (Vatican City State)',
      phone: '379',
    },
    {
      code: 'VC',
      name: 'Saint Vincent and the Grenadines',
      phone: '1-784',
    },
    { code: 'VE', name: 'Venezuela', phone: '58' },
    {
      code: 'VG',
      name: 'British Virgin Islands',
      phone: '1-284',
    },
    {
      code: 'VI',
      name: 'US Virgin Islands',
      phone: '1-340',
    },
    { code: 'VN', name: 'Vietnam', phone: '84' },
    { code: 'VU', name: 'Vanuatu', phone: '678' },
    { code: 'WF', name: 'Wallis and Futuna', phone: '681' },
    { code: 'WS', name: 'Samoa', phone: '685' },
    { code: 'XK', name: 'Kosovo', phone: '383' },
    { code: 'YE', name: 'Yemen', phone: '967' },
    { code: 'YT', name: 'Mayotte', phone: '262' },
    { code: 'ZA', name: 'South Africa', phone: '27' },
    { code: 'ZM', name: 'Zambia', phone: '260' },
    { code: 'ZW', name: 'Zimbabwe', phone: '263' },
  ];
  