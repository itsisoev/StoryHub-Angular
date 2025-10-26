import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ThemeToggle} from '../../shared/components/theme-toggle/theme-toggle';
import {UserStoryProfile} from "../../shared/components/user-story-profile/user-story-profile";
import {TuiButton} from '@taiga-ui/core';
import {TuiCarousel} from '@taiga-ui/kit';

@Component({
    selector: 'layout-header',
    imports: [
        ThemeToggle,
        UserStoryProfile, TuiCarousel, TuiButton
    ],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
    protected index = signal<number>(0);
    mockImages = signal([
        'https://i.pinimg.com/736x/0f/7a/1b/0f7a1b44a772a294b3b17bd62e3b3edb.jpg',
        'https://i.pinimg.com/736x/9d/6c/b2/9d6cb2ff813dffe31d654767b5389b35.jpg',
        'https://i.pinimg.com/736x/69/cd/d7/69cdd70e2366dad8a5e3dc43eaf9da06.jpg',
        'https://i.pinimg.com/736x/5e/20/14/5e201432edf89a85fe7b5e81ddef8f25.jpg',
        'https://i.pinimg.com/736x/7e/f1/01/7ef101dc4750180ffa21e9e5111d7329.jpg',
        'https://i.pinimg.com/736x/9d/57/2f/9d572f97407180eb6fec01cbdebac40d.jpg',
        'https://i.pinimg.com/736x/85/8c/25/858c25393820c968faad1be59ad78368.jpg',
        'https://i.pinimg.com/736x/97/2d/1e/972d1e158cc237faf300f54888454e5d.jpg',
        'https://i.pinimg.com/236x/0c/44/b5/0c44b5f2b1d9fe6bd40c962840e51b65.jpg',
        'https://i.pinimg.com/236x/33/d5/6e/33d56ebef957e6168a500cd985700c56.jpg',
        'https://i.pinimg.com/236x/e2/5c/fc/e25cfccbaaa2d45c6fac1ddc9d07a03b.jpg'
    ])
}
