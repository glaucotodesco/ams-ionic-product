# No GitBash:

1. Instalando o ionic
```
   npm install --global @ionic/cli
```

2. Criando um projeto com o template vazio:
```
  ionic start ams-ionic-product blank --type=angular
```

3. Abrindo o projeto do VSCode:
```
  cd ams-ionic-product
  code .
```

# No GitBash do VSCode

1. Executando o servidor:
```
  ionic serve
```

2. Vejas os componentes do Ionic:  
https://ionicframework.com/docs/components

3. Criando páginas:
```
	ionic g page pages/products
	ionic g page pages/productDetails
```

4. Testando as páginas e rotas:  
http://localhost:8100/products  
http://localhost:8100/product-details  
http://localhost:8100/home  

5. Alterando e testando a rota do details:  
``` 
  product-details/:id
```	
http://localhost:8100/product-details/1  
http://localhost:8100/product-details/2  

6. Importar o módulo http dentro do módulo principal:
```
   import { HttpClientModule } from '@angular/common/http';
   
   imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],  
```

7. Ajustando o baseUrl no environment
```
	baseUrl: 'http://localhost:8080'
```

8. Criando um modelo para product:
```
	export interface Product {
  		id: number,
  		name: string,
  		price: number
	}
```

9. Create service:
```
	ionic g service services/product
```

10. Criando dois serviços para o ProductService:
```
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.baseUrl}/products`);
  }

  getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(`${environment.baseUrl}/products/${id}`);
  }
}
```

11. Criando a página products (Classe):
```
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products:Product[] = []
  constructor(private service: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getProducts().subscribe(
      {
        next: produts => this.products=produts
      }
    );
  }
}

```

12. Criando a página products (Template):
```
<ion-header>
  <ion-toolbar>
    <ion-title>
      Produtos
    </ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
  
</ion-content>
```


13. Adicionando uma lista em produts:
```
<ion-content>
  <ion-list>
    <ion-item>
      <ion-label>Pokémon Yellow</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Mega Man X</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>The Legend of Zelda</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Pac-Man</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Super Mario World</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
```
14. Listando todos os produtos:

```
<ion-header>
  <ion-toolbar>
    <ion-title>
      Produtos
    </ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      <ion-item *ngFor="let product of products">
        <ion-label><h1>{{product.name}}</h1></ion-label>
      </ion-item>
    </ion-list>
</ion-content>

```


15. Adicionando link para o details:
```
  <ion-item button *ngFor="let product of products" [routerLink]="[product.id]">
```

16. Ajustando a rota do details:
```
  path: 'products/:id',
```  

17. Detalhes do produto: classe
```
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  product: Product = {} as Product;

  constructor( private route: ActivatedRoute,
               private service: ProductService
             ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.service.getProductById(id).subscribe(
       {
          next: product => this.product = product
        }
      )
    }
  }
}
```

18. Detalhes do produto: template
```
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/products"></ion-back-button>
    </ion-buttons>
    <ion-title>
      Dados do produto:
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item-group>
      <ion-item>
        <ion-label><h1>Id:</h1><p>{{ product.id }}</p></ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <h1>Nome:</h1>
          <p>{{ product.name }}</p>
               </ion-label>
      </ion-item>

      <ion-item>
        <ion-label><h1>Preço:</h1> <p>{{ product.price | currency:'BRL':true:'1.2-2'}}</p> </ion-label>
      </ion-item>
    </ion-item-group>
  </ion-list>
</ion-content>
```

19. Removendo o componente home e ajustando a rota padrão:
```
const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
];

```

20. Ajustando o Locale no módulo principal:

```
import { HttpClientModule } from '@angular/common/http';
import {LOCALE_ID} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: LOCALE_ID, useValue: "pt-BR"}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

```


