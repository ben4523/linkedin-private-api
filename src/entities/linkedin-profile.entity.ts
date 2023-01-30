import { Country } from '../types/country-code.enum';
import { LinkedInVectorImage } from './linkedin-vector-image.entity';

export const PROFILE_TYPE = 'com.linkedin.voyager.dash.identity.profile.Profile';

export interface MultiLocale {
  fr_FR: string;
}

interface DateRange {
  start: End;
  end: End;
  $recipeTypes: string[];
  $type: string;
}

interface End {
  year: number;
  $recipeTypes: string[];
  $type: string;
}

interface AntiAbuseMetadata {
  [key: string]: {
    sourceUrns: {
      'com.linkedin.common.urn.MemberUrn': { [key: string]: { [key: string]: string } };
    };
  };
}

interface LinkedInProfileGeoLocation {
  $type: 'com.linkedin.voyager.dash.identity.profile.ProfileGeoLocation';
  '*geo': string;
  $recipeTypes: string[];
  geoUrn: string;
}

interface LinkedInProfileLocation {
  $type: 'com.linkedin.voyager.dash.identity.profile.ProfileLocation';
  countryCode: Country;
}

interface LinkedInPrimaryLocale {
  $type: 'com.linkedin.common.Locale';
  $anti_abuse_annotations: {
    attributeId: number;
    entityId: number;
  }[];
  country: Country;
  language: string;
}

export interface LinkedInPhotoFilterPicture {
  $type: 'com.linkedin.voyager.dash.identity.profile.PhotoFilterPicture';
  $recipeTypes: string[];
  displayImageReference: {
    vectorImage: LinkedInVectorImage;
  };
  displayImageUrn: string;
  photoFilterEditInfo: unknown;
}

export type ProfileUrn = string;

export interface LinkedInProfile {
  $type: typeof PROFILE_TYPE;
  '*industry': string;
  '*profileCertifications': string;
  '*profileCourses': string;
  '*profileEducations': string;
  '*profileHonors': string;
  '*profileLanguages': string;
  '*profileOrganizations': string;
  '*profilePatents': string;
  '*profilePositionGroups': string;
  '*profileProjects': string;
  '*profilePublications': string;
  '*profileSkills': string;
  '*profileTestScores': string;
  '*profileTreasuryMediaProfile': string;
  '*profileVolunteerExperiences': string;
  $recipeTypes: string[];
  defaultToActivityTab: boolean;
  educationOnProfileTopCardShown: boolean;
  entityUrn: ProfileUrn;
  firstName: string;
  lastName: string;
  geoLocation: LinkedInProfileGeoLocation;
  geoLocationBackfilled: boolean;
  headline: string;
  industryUrn: string;
  location: LinkedInProfileLocation;
  locationName: string;
  multiLocaleFirstName: Record<string, string>;
  multiLocaleHeadline: Record<string, string>;
  multiLocaleLastName: Record<string, string>;
  objectUrn: string;
  primaryLocale: LinkedInPrimaryLocale;
  profilePicture: LinkedInPhotoFilterPicture;
  publicIdentifier: string;
  supportedLocales: LinkedInPrimaryLocale[];
  trackingId: string;
  versionTag: string;
}

export const PROFILE_CERTIFICATION_TYPE = 'com.linkedin.voyager.dash.identity.profile.Certification';

export interface ProfileCertification {
  $type: typeof PROFILE_CERTIFICATION_TYPE;
}

export const PROFILE_COURSE_TYPE = 'com.linkedin.voyager.dash.identity.profile.Course';

export interface ProfileCourse {
  $type: typeof PROFILE_COURSE_TYPE;
  occupation: {
    '*profileEducation': string;
  };
  occupationUnion: {
    profileEducation: string;
  };
  $recipeTypes: string[];
  number: null;
  entityUrn: string;
  name: string;
  multiLocaleName: MultiLocale;
}

export const PROFILE_EDUCATION_TYPE = 'com.linkedin.voyager.dash.identity.profile.Education';
export interface ProfileEducation {
  dateRange: DateRange;
  $anti_abuse_metadata: AntiAbuseMetadata;
  description: null | string;
  degreeName: string;
  multiLocaleGrade: null | MultiLocale;
  '*profileTreasuryMediaEducation': string;
  $recipeTypes: string[];
  companyUrn: null | string;
  multiLocaleSchoolName: MultiLocale;
  $type: string;
  schoolUrn: null | string;
  multiLocaleActivities: MultiLocale;
  entityUrn: string;
  activities: string;
  grade: null | string;
  multiLocaleFieldOfStudy: null | MultiLocale;
  standardizedFieldOfStudyUrn: null | string;
  schoolName: string;
  multiLocaleDescription: null | MultiLocale;
  fieldOfStudy: null | string;
  multiLocaleDegreeName: MultiLocale;
  degreeUrn: null | string;
}

export const PROFILE_HONOR_TYPE = 'com.linkedin.voyager.dash.identity.profile.Honor';

export interface ProfileHonor {
  occupation: {
    '*profilePosition': string;
  };
  multiLocaleTitle: { [key: string]: string };
  $anti_abuse_metadata: AntiAbuseMetadata;
  description: string;
  occupationUnion: {
    profilePosition: string;
  };
  title: string;
  $recipeTypes: string[];
  issuer: string;
  issuedOn: {
    month: number;
    year: number;
    $recipeTypes: string[];
    $type: string;
  };
  $type: string;
  entityUrn: string;
  multiLocaleIssuer: MultiLocale;
  multiLocaleDescription: MultiLocale;
}

export const PROFILE_LANGUAGE_TYPE = 'com.linkedin.voyager.dash.identity.profile.Language';

export interface ProfileLanguage {
  $anti_abuse_metadata: AntiAbuseMetadata;
  $recipeTypes: string[];
  proficiency: string;
  $type: string;
  entityUrn: string;
  name: string;
  multiLocaleName: MultiLocale;
}

export const PROFILE_ORGANIZATION_TYPE = 'com.linkedin.voyager.dash.identity.profile.Organization';

export interface ProfileOrganization {
  occupation: {
    '*profilePosition': string;
  };
  dateRange: DateRange;
  $anti_abuse_metadata: AntiAbuseMetadata;
  description: null;
  occupationUnion: {
    profilePosition: string;
  };
  $recipeTypes: string[];
  $type: string;
  entityUrn: string;
  name: string;
  multiLocaleName: MultiLocale;
  positionHeld: string;
  multiLocalePositionHeld: MultiLocale;
  multiLocaleDescription: MultiLocale | null;
}

export const PROFILE_POSITION_TYPE = 'com.linkedin.voyager.dash.identity.profile.Position';

export interface ProfilePosition {
  shouldShowSourceOfHireBadge: boolean;
  locationName: string;
  '*profileTreasuryMediaPosition': string;
  multiLocaleTitle: MultiLocale;
  dateRange: DateRange;
  multiLocaleCompanyName: MultiLocale;
  geoUrn: string;
  companyName: string;
  description: string;
  '*company': string;
  title: string;
  $recipeTypes: string[];
  companyUrn: string;
  $type: string;
  '*region': string;
  regionUrn: string;
  '*geo': string;
  entityUrn: string;
  geoLocationName: string;
  multiLocaleGeoLocationName: MultiLocale;
  multiLocaleDescription: MultiLocale;
  multiLocaleLocationName: MultiLocale;
}

export const PROFILE_POSITION_GROUP_TYPE = 'com.linkedin.voyager.dash.identity.profile.PositionGroup';

export interface ProfilePositionGroup {
  '*profilePositionInPositionGroup': string;
  dateRange: DateRange;
  multiLocaleCompanyName: MultiLocale;
  companyName: string;
  '*company': string;
  companyUrn: string;
  $recipeTypes: string[];
  $type: string;
  entityUrn: string;
}

export const PROFILE_PROJECT_TYPE = 'com.linkedin.voyager.dash.identity.profile.Project';

export interface ProfileProject {
  occupation: {
    '*profilePosition': string;
  };
  multiLocaleTitle: MultiLocale;
  dateRange: DateRange;
  $anti_abuse_metadata: AntiAbuseMetadata;
  description: string;
  occupationUnion: {
    profilePosition: string;
  };
  title: string;
  $recipeTypes: string[];
  url: string;
  $type: string;
  entityUrn: string;
  contributors: {
    standardizedContributor: {
      '*profile': string;
      $recipeTypes: string[];
      profileUrn: string;
      $type: string;
    };
  }[];
  multiLocaleDescription: MultiLocale;
}

export const PROFILE_PUBLICATION_TYPE = 'com.linkedin.voyager.dash.identity.profile.Publication';

export interface ProfilePublication {
  $anti_abuse_metadata: AntiAbuseMetadata;
  publishedOn: {
    month: number;
    year: number;
    day: number;
    $recipeTypes: string[];
    $type: string;
  };
  description: null;
  $recipeTypes: string[];
  url: string;
  $type: string;
  entityUrn: string;
  name: string;
  multiLocaleName: MultiLocale;
  publisher: string;
  multiLocaleDescription: null;
  multiLocalePublisher: MultiLocale;
  authors: {
    standardizedContributor: {
      '*profile': string;
      $recipeTypes: string[];
      profileUrn: string;
      $type: string;
    };
  }[];
}

export const PROFILE_SKILL_TYPE = 'com.linkedin.voyager.dash.identity.profile.Skill';
export interface ProfileSkill {
  entityUrn: string;
  $anti_abuse_metadata: AntiAbuseMetadata;
  name: string;
  multiLocaleName: MultiLocale;
  $recipeTypes: string[];
  $type: string;
}

export const PROFILE_VOLUNTEER_EXPERIENCE_TYPE = 'com.linkedin.voyager.dash.identity.profile.VolunteerExperience';
export interface ProfileVolunteerExperience {
  multiLocaleRole: MultiLocale;
  role: string;
  dateRange: DateRange;
  multiLocaleCompanyName: MultiLocale;
  $anti_abuse_metadata: AntiAbuseMetadata;
  companyName: string;
  cause: string;
  description: null;
  '*company': string;
  companyUrn: string;
  $recipeTypes: string[];
  $type: string;
  entityUrn: string;
  multiLocaleDescription: null;
}

export const PROFILE_UPDATE_V2 = 'com.linkedin.voyager.feed.render.UpdateV2';
export interface LinkedInProfileSharedFeed {
  $type: typeof PROFILE_UPDATE_V2;
  dashEntityUrn: string;
  showSocialDetail: null;
  socialContent: null;
  footer: null;
  desktopPromoUpdate: null;
  carouselContent: null;
  content?: {
    title?: {
      text: string;
    };
    subtitle?: {
      text: string;
    };
    images: {
      accessibilityTextSourceType: string;
      attributes: {
        useCropping: boolean;
        mediaUrn: string;
        sourceType: string;
        vectorImage: {
          digitalmediaAsset: string;
          artifacts: {
            width: number;
            fileIdentifyingUrlPathSegment: string;
            expiresAt: number;
            height: number;
            $type: string;
          }[];
          rootUrl: string;
          $type: string;
        };
        displayAspectRatio: number;
        $type: string;
      }[];
      editableAccessibilityText: boolean;
      accessibilityTextAttributes: any[];
      accessibilityText: string;
      $type: string;
    }[];
    showTemplateCta: boolean;
    $type: string;
  };
  updateMetadata: {
    urn: string;
    actionsPosition: string;
    actionTriggerEnabled: boolean;
    '*updateActions': string;
    detailPageType: string;
    shareAudience: string;
    shareUrn: string;
    excludedFromSeen: boolean;
    trackingData: {
      requestId: string;
      trackingId: string;
      $type: string;
    };
    $type: string;
  };
  detailHeader: null;
  entityUrn: string;
  leadGenFormContent: null;
  annotation: null;
  contextualHeader: null;
  resharedUpdate: null;
  interstitial: null;
  contextualDescriptionV2: null;
  leadGenFormContentV2: null;
  contextualDescription: null;
  aggregatedContent: null;
  actor?: {
    urn: string;
    image: {
      accessibilityTextAttributes: any[];
      attributes: {
        sourceType: string;
        '*miniProfile': string;
        $type: string;
      }[];
      $type: string;
    };
    supplementaryActorInfo: {
      textDirection: string;
      text: string;
      $type: string;
      attributes?: {
        start: number;
        length: number;
        type: string;
        '*miniProfile'?: string;
        $type: string;
        artDecoIcon?: string;
        link?: string;
      }[];
    };
    name: {
      textDirection: string;
      text: string;
      $type: string;
      attributes?: {
        start: number;
        length: number;
        type: string;
        '*miniProfile'?: string;
        $type: string;
        artDecoIcon?: string;
        link?: string;
      }[];
    };
    subDescription: {
      textDirection: string;
      attributes: {
        start: number;
        length: number;
        type: string;
        '*miniProfile'?: string;
        $type: string;
        artDecoIcon?: string;
        link?: string;
      }[];
      text: string;
      accessibilityText: string;
      $type: string;
    };
    navigationContext: {
      actionTarget: string;
      trackingActionType: string;
      accessibilityText: string;
      $type: string;
    };
    description: {
      textDirection: string;
      text: string;
      $type: string;
      attributes?: {
        start: number;
        length: number;
        type: string;
        '*miniProfile'?: string;
        $type: string;
        artDecoIcon?: string;
        link?: string;
      }[];
    };
    $type: string;
  };
  relatedContent: null;
  '*socialDetail': string;
  header: null;
  highlightedComments: null;
  commentary?: {
    templateType: string;
    numLines: number;
    text: {
      textDirection: string;
      text: string;
      $type: string;
      attributes?: {
        start: number;
        length: number;
        type: string;
        '*miniProfile'?: string;
        $type: string;
        artDecoIcon?: string;
        link?: string;
      }[];
    };
    $type: string;
  };
  additionalContents: null;
}

// export interface LinkedInProfileActivities {
//   $type: typeof PROFILE_UPDATE_V2;
//   commentary?: {
//     text: {
//       text: string;
//     };
//   };
//   actor?: {
//     subDescription: {
//       accessibilityText: string;
//     };
//     name: {
//       text: string;
//     };
//     urn: string;
//   };
//   content?: {
//     title?: {
//       text?: string;
//     };
//     subtitle?: { text?: string };
//   };
// }
