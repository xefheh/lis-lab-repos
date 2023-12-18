package pages.abstractions;

import com.codeborne.selenide.SelenideElement;
import pages.MainPage;

import static com.codeborne.selenide.Selenide.$x;

public abstract class RelativePage {
    private final SelenideElement returnToMainAnchor = $x("//div[@class='header__logo']//a");
    protected final MainPage mainPage;

    public RelativePage(MainPage mainPage) {
        this.mainPage = mainPage;
    }

    public MainPage returnToMainPage() {
        returnToMainAnchor.click();
        return mainPage;
    }
}
