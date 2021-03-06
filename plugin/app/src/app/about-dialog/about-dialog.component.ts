import { Component, OnInit, VERSION as  angularCoreVersion } from "@angular/core";
import { VERSION as angularMaterialVersion } from "@angular/material";
import * as d3 from "d3";
import { AppUsageService } from "../shared/services/app-usage/app-usage.service";
import { AppUsageDetails } from "../shared/models/app-usage-details.model";
import { AppUsageDao } from "../shared/dao/app-usage/app-usage.dao";

@Component({
	selector: "app-about-dialog",
	templateUrl: "./about-dialog.component.html",
	styleUrls: ["./about-dialog.component.scss"],
	providers: [AppUsageService, AppUsageDao]
})
export class AboutDialogComponent implements OnInit {

	public static readonly MAX_WIDTH: string = "40%";
	public static readonly MIN_WIDTH: string = "40%";

	public angularCoreVersion: string;
	public angularMaterialVersion: string;
	public d3Version: string;
	public appVersion: string;
	public appUsageDetails: AppUsageDetails;

	constructor(public appUsageService: AppUsageService) {
	}

	public ngOnInit(): void {

		this.appUsageService.get().then((appUsageDetails: AppUsageDetails) => {
			this.appUsageDetails = appUsageDetails;
		});

		this.appVersion = this.getAppVersion();
		this.angularCoreVersion = angularCoreVersion.full;
		this.angularMaterialVersion = angularMaterialVersion.full;
		this.d3Version = d3.version;
	}

	public getAppVersion(): string {
		return chrome.runtime.getManifest().version_name;
	}

}
