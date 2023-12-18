package pages;

import com.codeborne.selenide.ElementsCollection;
import pages.abstractions.RelativePage;

import static com.codeborne.selenide.Selenide.$$x;

public class SearchPage extends RelativePage {
    private final ElementsCollection catalogItems = $$x("//div[@class='catalog-item']");
    private final ElementsCollection catalogItemButtons = $$x("//button[@title='Добавить в корзину']");

    public SearchPage(MainPage mainPage) {
        super(mainPage);
    }

    public SearchPage pressCartButtonById(int index) {
        var currentButton = catalogItemButtons.get(index);
        currentButton.click();
        return this;
    }

    public ProductPage openItemCardByIndex(int index) {
        var currentItem = catalogItems.get(index);
        currentItem.click();
        return new ProductPage(mainPage);
    }
}
