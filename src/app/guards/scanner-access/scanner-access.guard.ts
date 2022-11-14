import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ScannerAccessGuard implements CanActivate {
  private rol: string | undefined | null;
  constructor(private storageService: StorageService,private router:Router) {}

  async canActivate(): Promise<any>{
    await this.storageService.getRol()
    .then(storageRol=>{
      this.rol = storageRol;
    })
    if(this.rol != 'scanner'){
      this.router.navigate(['/login']);
    }
    return this.rol == 'scanner';
  }
  
}
