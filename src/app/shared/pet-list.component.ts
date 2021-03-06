import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Pet} from "./pet";
import {PetService} from "../core/pet.service";
import { Observable } from "rxjs";
@Component({
	selector: "pet-list",
	template: require("./pet-list.component.html"),
	styles: [require("./pet-list.component.scss").toString()]
})
export class PetListComponent implements OnInit {
	favouritePet: Pet;
	pets: Observable<Pet[]>;

	private type: "cat" | "dog";

	constructor(private petService: PetService, private router: Router, private route: ActivatedRoute) {
		this.type = route.snapshot.data["type"];
	}

	ngOnInit (): any {
		this.pets = this.petService.getPetList(this.type);
		this.favouritePet = this.petService.favouritePet;
	}

	selectPet(pet: Pet): any {
		this.router.navigate([this.type + "s", pet.id]);
	}

	addPet(): any {
		this.router.navigate([this.type + "s", "new"]);
	}


}