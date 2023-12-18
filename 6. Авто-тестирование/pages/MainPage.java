package pages;

import com.codeborne.selenide.*;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NotFoundException;

import java.util.Objects;

import static com.codeborne.selenide.Selenide.*;

public class MainPage {

    private final SelenideElement searchField = $x("//input[@placeholder='Поиск']");
    private final SelenideElement cartButton = $x("//button[@title='Открыть корзину']");
    private final ElementsCollection categoryNavigationAnchors = $$x("//li[@class='main-nav__item']//a");

    public MainPage(String url) {
        Selenide.open(url);
    }

    public SearchPage search(String searchString) {
        searchField.setValue(searchString);
        searchField.sendKeys(Keys.ENTER);
        return new SearchPage(this);
    }

    public SearchPage goToCategoryByName(String categoryName) {
        SearchPage searchPage = null;
        for (SelenideElement element : categoryNavigationAnchors) {
            if (Objects.equals(element.getAttribute("data-title"), categoryName)) {
                searchPage = new SearchPage(this);
                element.click();
                break;
            }
        }
        if(searchPage == null) throw new NotFoundException(String.format("Category with name %s not found", categoryName));
        return searchPage;
    }

    public CartPage goToCartPage() {
        cartButton.click();
        return new CartPage(this);
    }
}
