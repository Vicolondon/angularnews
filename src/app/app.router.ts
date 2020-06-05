/* 
Imports
*/
    // Angular
    import { Routes } from '@angular/router';
    
    // Inner
    import { HomeComponent } from "./pages/home/home.component";
    import { MeComponent } from "./pages/me/me.component";
    import { ArticlesComponent } from "./pages/articles/articles.component";
    import { LoginPageComponent } from "./pages/login-page/login-page.component";
    import { FavoritesComponent } from "./pages/favorites/favorites.component";
    import { SourcesComponent } from "./pages/sources/sources.component";

    // Auth
    import { AuthGuard } from "./guards/auth.guard";
//

/* 
Export
*/
    export const AppRouterModule: Routes = [
        {
            path: '',
            component: HomeComponent
        },
        {
            path: 'login',
            component: LoginPageComponent
        },
        {
            path: 'me',
            component: MeComponent
        },
        {
            path: 'articles',
            component: ArticlesComponent
        },
        {
            path: 'sources',
            canActivate: [ AuthGuard ],
            component: SourcesComponent
        },
        {
            path: 'favorites',
            canActivate: [ AuthGuard ],
            component: FavoritesComponent
        }
    ];
//