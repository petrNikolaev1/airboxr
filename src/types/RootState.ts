import { HomePageState } from 'app/containers/HomePage/types';
import { ThemeState } from 'styles/theme/types';
import { SourcesPageState } from 'app/containers/SourcesPage/types';
import { SourcePageState } from 'app/containers/SourcePage/types';
import { SourcesProviderState } from 'app/containers/SourcesProvider/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  theme?: ThemeState;
  homePage?: HomePageState;
  sourcesPage?: SourcesPageState;
  sourcePage?: SourcePageState;
  sourcesProvider?: SourcesProviderState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
